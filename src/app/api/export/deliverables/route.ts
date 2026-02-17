import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { generateDeliverablesCSV } from '@/lib/export/csv'

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    
    // Get current user and organization
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('organization_id')
      .eq('id', user.id)
      .single()

    if (!profile?.organization_id) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 })
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const eventId = searchParams.get('eventId')
    const status = searchParams.get('status')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    // Build query
    let query = supabase
      .from('deliverables')
      .select(`
        id,
        title,
        description,
        due_date,
        status,
        priority,
        completion_notes,
        updated_at,
        sponsors (
          company_name,
          events (
            name
          )
        ),
        profiles (
          full_name,
          email
        )
      `)
      .eq('sponsors.organization_id', profile.organization_id)

    // Apply filters
    if (eventId && eventId !== 'all') {
      query = query.eq('sponsors.event_id', eventId)
    }
    
    if (status && status !== 'all') {
      query = query.eq('status', status)
    }
    
    if (startDate) {
      query = query.gte('due_date', startDate)
    }
    
    if (endDate) {
      query = query.lte('due_date', endDate)
    }

    // Execute query
    const { data: deliverables, error } = await query.order('due_date')

    if (error) {
      console.error('Export query error:', error)
      return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
    }

    // Generate CSV
    const csvContent = generateDeliverablesCSV(deliverables || [])
    
    // Return CSV file
    const filename = `deliverables-export-${new Date().toISOString().split('T')[0]}.csv`
    
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })

  } catch (error: any) {
    console.error('Export error:', error)
    return NextResponse.json(
      { error: 'Export failed', details: error.message },
      { status: 500 }
    )
  }
}