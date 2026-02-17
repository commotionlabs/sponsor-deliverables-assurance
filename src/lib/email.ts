import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface DeliverableReminderEmailData {
  recipientEmail: string
  recipientName: string
  deliverableTitle: string
  sponsorName: string
  eventName: string
  dueDate: string
  daysUntilDue: number
  dashboardUrl: string
}

export async function sendDeliverableReminder(data: DeliverableReminderEmailData) {
  const subject = `Reminder: ${data.deliverableTitle} due ${data.daysUntilDue === 0 ? 'today' : `in ${data.daysUntilDue} day${data.daysUntilDue > 1 ? 's' : ''}`}`
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none; }
        .urgency-high { border-left: 4px solid #dc2626; padding-left: 16px; }
        .urgency-medium { border-left: 4px solid #d97706; padding-left: 16px; }
        .urgency-low { border-left: 4px solid #2563eb; padding-left: 16px; }
        .button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 16px 0; }
        .footer { margin-top: 30px; font-size: 12px; color: #6b7280; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0;">SponsorAssure Reminder</h1>
        </div>
        <div class="content">
          <p>Hi ${data.recipientName},</p>
          
          <div class="${data.daysUntilDue <= 1 ? 'urgency-high' : data.daysUntilDue <= 3 ? 'urgency-medium' : 'urgency-low'}">
            <h3>Deliverable Due ${data.daysUntilDue === 0 ? 'Today' : `in ${data.daysUntilDue} Day${data.daysUntilDue > 1 ? 's' : ''}`}</h3>
            <p><strong>Deliverable:</strong> ${data.deliverableTitle}</p>
            <p><strong>Sponsor:</strong> ${data.sponsorName}</p>
            <p><strong>Event:</strong> ${data.eventName}</p>
            <p><strong>Due Date:</strong> ${data.dueDate}</p>
          </div>
          
          ${data.daysUntilDue === 0 ? 
            '<p><strong>⚠️ This deliverable is due today!</strong> Please update its status in your dashboard as soon as it\'s completed.</p>' : 
            data.daysUntilDue === 1 ?
            '<p><strong>📅 This deliverable is due tomorrow.</strong> Make sure you have everything ready to complete it on time.</p>' :
            '<p>This is a friendly reminder to help you stay on track with your sponsor commitments.</p>'
          }
          
          <a href="${data.dashboardUrl}" class="button">View in Dashboard</a>
          
          <p>Need help? Reply to this email or contact our support team.</p>
          
          <p>Best regards,<br>The SponsorAssure Team</p>
        </div>
        <div class="footer">
          <p>This is an automated reminder from SponsorAssure. You can manage your notification settings in your dashboard.</p>
        </div>
      </div>
    </body>
    </html>
  `

  try {
    const result = await resend.emails.send({
      from: 'SponsorAssure <reminders@sponsorassure.com>',
      to: [data.recipientEmail],
      subject,
      html,
    })

    return { success: true, messageId: result.data?.id }
  } catch (error) {
    console.error('Failed to send email:', error)
    return { success: false, error }
  }
}

export interface OverdueDeliverableEmailData {
  recipientEmail: string
  recipientName: string
  overdueDeliverables: Array<{
    title: string
    sponsorName: string
    eventName: string
    dueDate: string
    daysOverdue: number
  }>
  dashboardUrl: string
}

export async function sendOverdueDeliverableAlert(data: OverdueDeliverableEmailData) {
  const subject = `Urgent: ${data.overdueDeliverables.length} overdue deliverable${data.overdueDeliverables.length > 1 ? 's' : ''} need attention`
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #dc2626; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #fef2f2; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #fecaca; border-top: none; }
        .deliverable { background: white; margin: 16px 0; padding: 16px; border-radius: 6px; border-left: 4px solid #dc2626; }
        .button { display: inline-block; background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 16px 0; }
        .footer { margin-top: 30px; font-size: 12px; color: #6b7280; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0;">🚨 Overdue Deliverables Alert</h1>
        </div>
        <div class="content">
          <p>Hi ${data.recipientName},</p>
          
          <p><strong>You have ${data.overdueDeliverables.length} overdue deliverable${data.overdueDeliverables.length > 1 ? 's' : ''} that require immediate attention:</strong></p>
          
          ${data.overdueDeliverables.map(deliverable => `
            <div class="deliverable">
              <h4 style="margin: 0 0 8px 0; color: #dc2626;">${deliverable.title}</h4>
              <p style="margin: 4px 0;"><strong>Sponsor:</strong> ${deliverable.sponsorName}</p>
              <p style="margin: 4px 0;"><strong>Event:</strong> ${deliverable.eventName}</p>
              <p style="margin: 4px 0;"><strong>Due Date:</strong> ${deliverable.dueDate} (${deliverable.daysOverdue} day${deliverable.daysOverdue > 1 ? 's' : ''} overdue)</p>
            </div>
          `).join('')}
          
          <p>Please take immediate action to complete these deliverables and maintain your sponsor relationships.</p>
          
          <a href="${data.dashboardUrl}" class="button">View Dashboard</a>
          
          <p>If you need assistance or have questions, please reply to this email.</p>
          
          <p>Best regards,<br>The SponsorAssure Team</p>
        </div>
        <div class="footer">
          <p>This is an automated alert from SponsorAssure. Critical notifications cannot be disabled to ensure sponsor commitments are met.</p>
        </div>
      </div>
    </body>
    </html>
  `

  try {
    const result = await resend.emails.send({
      from: 'SponsorAssure <alerts@sponsorassure.com>',
      to: [data.recipientEmail],
      subject,
      html,
    })

    return { success: true, messageId: result.data?.id }
  } catch (error) {
    console.error('Failed to send overdue alert:', error)
    return { success: false, error }
  }
}