import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { generateSponsorsCSV } from '@/lib/export/csv'

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

    // Build query
    let query = supabase
      .from('sponsors')
      .select(`
        id,
        company_name,
        contact_name,
        contact_email,
        contract_value,
        payment_status,
        events (
          name
        ),
        sponsor_package_templates (
          tier
        ),
        deliverables (
          id,
          status,
          due_date
        )
      `)
      .eq('organization_id', profile.organization_id)

    // Apply filters
    if (eventId && eventId !== 'all') {
      query = query.eq('event_id', eventId)
    }

    // Execute query
    const { data: sponsors, error } = await query.order('company_name')

    if (error) {
      console.error('Export query error:', error)
      return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
    }

    // Generate CSV
    const csvContent = generateSponsorsCSV(sponsors || [])
    
    // Return CSV file
    const filename = `sponsors-export-${new Date().toISOString().split('T')[0]}.csv`
    
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