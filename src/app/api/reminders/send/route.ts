import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendDeliverableReminder, sendOverdueDeliverableAlert } from '@/lib/email'
import { Database } from '@/lib/supabase/database.types'

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    // Verify the request is from a scheduled job (you might want to add authentication)
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const today = new Date()
    const todayISO = today.toISOString().split('T')[0]
    const threeDaysFromNow = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    const sevenDaysFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    const oneDayFromNow = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

    // Get deliverables that need reminders
    const { data: deliverables, error } = await supabase
      .from('deliverables')
      .select(`
        id,
        title,
        description,
        due_date,
        status,
        priority,
        reminder_sent_at,
        assigned_to,
        sponsors (
          company_name,
          organization_id,
          events (
            name
          )
        ),
        profiles (
          full_name,
          email
        )
      `)
      .in('status', ['pending', 'in_progress'])
      .lte('due_date', sevenDaysFromNow)

    if (error) {
      console.error('Failed to fetch deliverables:', error)
      return NextResponse.json({ error: 'Failed to fetch deliverables' }, { status: 500 })
    }

    const sentReminders: string[] = []
    const errors: string[] = []

    // Process each deliverable
    for (const deliverable of deliverables || []) {
      if (!deliverable.profiles?.email || !deliverable.assigned_to) {
        continue // Skip if no assignee or email
      }

      const dueDate = new Date(deliverable.due_date)
      const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      
      // Determine if we should send a reminder
      let shouldSend = false
      const lastReminder = deliverable.reminder_sent_at ? new Date(deliverable.reminder_sent_at) : null
      const hoursSinceLastReminder = lastReminder ? (today.getTime() - lastReminder.getTime()) / (1000 * 60 * 60) : Infinity

      if (daysUntilDue < 0) {
        // Overdue - send daily reminders
        shouldSend = !lastReminder || hoursSinceLastReminder >= 24
      } else if (daysUntilDue === 0) {
        // Due today - send if not sent today
        shouldSend = !lastReminder || lastReminder.toDateString() !== today.toDateString()
      } else if (daysUntilDue === 1) {
        // Due tomorrow - send once
        shouldSend = !lastReminder || hoursSinceLastReminder >= 24
      } else if (daysUntilDue === 3) {
        // Due in 3 days - send once
        shouldSend = !lastReminder || hoursSinceLastReminder >= 72
      } else if (daysUntilDue === 7) {
        // Due in 7 days - send once
        shouldSend = !lastReminder || hoursSinceLastReminder >= 168
      }

      if (!shouldSend) continue

      try {
        const emailData = {
          recipientEmail: deliverable.profiles.email,
          recipientName: deliverable.profiles.full_name || deliverable.profiles.email,
          deliverableTitle: deliverable.title,
          sponsorName: deliverable.sponsors?.company_name || 'Unknown Sponsor',
          eventName: deliverable.sponsors?.events?.name || 'Unknown Event',
          dueDate: dueDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          daysUntilDue: Math.max(0, daysUntilDue),
          dashboardUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard/deliverables`
        }

        const result = await sendDeliverableReminder(emailData)

        if (result.success) {
          // Update reminder_sent_at
          await supabase
            .from('deliverables')
            .update({ reminder_sent_at: today.toISOString() })
            .eq('id', deliverable.id)

          sentReminders.push(`${deliverable.title} to ${deliverable.profiles.email}`)
        } else {
          errors.push(`Failed to send to ${deliverable.profiles.email}: ${result.error}`)
        }
      } catch (error: any) {
        errors.push(`Error sending reminder for ${deliverable.title}: ${error.message}`)
      }
    }

    // Send overdue alerts for organization admins
    const { data: overdueByOrg } = await supabase
      .from('deliverables')
      .select(`
        id,
        title,
        due_date,
        sponsors (
          company_name,
          organization_id,
          events (
            name
          )
        )
      `)
      .in('status', ['pending', 'in_progress'])
      .lt('due_date', todayISO)

    if (overdueByOrg && overdueByOrg.length > 0) {
      // Group by organization
      const orgGroups: { [key: string]: any[] } = {}
      
      for (const deliverable of overdueByOrg) {
        const orgId = deliverable.sponsors?.organization_id
        if (!orgId) continue
        
        if (!orgGroups[orgId]) {
          orgGroups[orgId] = []
        }
        orgGroups[orgId].push(deliverable)
      }

      // Send alerts to organization admins
      for (const [orgId, orgDeliverables] of Object.entries(orgGroups)) {
        const { data: admins } = await supabase
          .from('profiles')
          .select('email, full_name')
          .eq('organization_id', orgId)
          .eq('role', 'admin')

        for (const admin of admins || []) {
          try {
            const emailData = {
              recipientEmail: admin.email,
              recipientName: admin.full_name || admin.email,
              overdueDeliverables: orgDeliverables.map((d: any) => ({
                title: d.title,
                sponsorName: d.sponsors?.company_name || 'Unknown',
                eventName: d.sponsors?.events?.name || 'Unknown',
                dueDate: new Date(d.due_date).toLocaleDateString(),
                daysOverdue: Math.ceil((today.getTime() - new Date(d.due_date).getTime()) / (1000 * 60 * 60 * 24))
              })),
              dashboardUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard/risk`
            }

            await sendOverdueDeliverableAlert(emailData)
            sentReminders.push(`Overdue alert to ${admin.email}`)
          } catch (error: any) {
            errors.push(`Failed to send overdue alert to ${admin.email}: ${error.message}`)
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      sent: sentReminders.length,
      reminders: sentReminders,
      errors: errors.length > 0 ? errors : undefined
    })

  } catch (error: any) {
    console.error('Reminder service error:', error)
    return NextResponse.json(
      { error: 'Reminder service failed', details: error.message },
      { status: 500 }
    )
  }
}