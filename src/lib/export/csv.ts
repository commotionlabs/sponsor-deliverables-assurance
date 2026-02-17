export interface DeliverableExportRow {
  'Event Name': string
  'Sponsor': string
  'Deliverable': string
  'Description': string
  'Due Date': string
  'Status': string
  'Priority': string
  'Assigned To': string
  'Completion Date': string
  'Completion Notes': string
  'Days Until Due': string
  'Risk Level': string
}

export function generateDeliverablesCSV(data: any[]): string {
  const today = new Date()
  
  const rows: DeliverableExportRow[] = data.map((deliverable) => {
    const dueDate = new Date(deliverable.due_date)
    const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    
    let riskLevel = 'Low'
    if (daysUntilDue < 0) riskLevel = 'Critical'
    else if (daysUntilDue <= 1) riskLevel = 'High'
    else if (daysUntilDue <= 3) riskLevel = 'Medium'
    
    return {
      'Event Name': deliverable.sponsors?.events?.name || 'N/A',
      'Sponsor': deliverable.sponsors?.company_name || 'N/A',
      'Deliverable': deliverable.title,
      'Description': deliverable.description || '',
      'Due Date': dueDate.toLocaleDateString(),
      'Status': deliverable.status.replace('_', ' ').toUpperCase(),
      'Priority': deliverable.priority?.toUpperCase() || 'MEDIUM',
      'Assigned To': deliverable.profiles?.full_name || deliverable.profiles?.email || 'Unassigned',
      'Completion Date': deliverable.status === 'completed' && deliverable.updated_at ? 
        new Date(deliverable.updated_at).toLocaleDateString() : '',
      'Completion Notes': deliverable.completion_notes || '',
      'Days Until Due': daysUntilDue.toString(),
      'Risk Level': riskLevel
    }
  })

  // Convert to CSV
  const headers = Object.keys(rows[0] || {})
  const csvContent = [
    headers.join(','),
    ...rows.map(row => 
      headers.map(header => 
        `"${String(row[header as keyof DeliverableExportRow] || '').replace(/"/g, '""')}"`
      ).join(',')
    )
  ].join('\n')

  return csvContent
}

export interface SponsorExportRow {
  'Event Name': string
  'Sponsor Company': string
  'Contact Name': string
  'Contact Email': string
  'Package Tier': string
  'Contract Value': string
  'Payment Status': string
  'Total Deliverables': string
  'Completed Deliverables': string
  'Overdue Deliverables': string
  'Completion Rate': string
}

export function generateSponsorsCSV(data: any[]): string {
  const rows: SponsorExportRow[] = data.map((sponsor) => {
    const totalDeliverables = sponsor.deliverables?.length || 0
    const completedDeliverables = sponsor.deliverables?.filter((d: any) => d.status === 'completed').length || 0
    const overdueDeliverables = sponsor.deliverables?.filter((d: any) => 
      d.status !== 'completed' && new Date(d.due_date) < new Date()
    ).length || 0
    
    const completionRate = totalDeliverables > 0 ? 
      Math.round((completedDeliverables / totalDeliverables) * 100) : 0

    return {
      'Event Name': sponsor.events?.name || 'N/A',
      'Sponsor Company': sponsor.company_name,
      'Contact Name': sponsor.contact_name || '',
      'Contact Email': sponsor.contact_email || '',
      'Package Tier': sponsor.sponsor_package_templates?.tier?.toUpperCase() || 'CUSTOM',
      'Contract Value': sponsor.contract_value ? `$${(sponsor.contract_value / 100).toLocaleString()}` : 'N/A',
      'Payment Status': sponsor.payment_status?.toUpperCase() || 'PENDING',
      'Total Deliverables': totalDeliverables.toString(),
      'Completed Deliverables': completedDeliverables.toString(),
      'Overdue Deliverables': overdueDeliverables.toString(),
      'Completion Rate': `${completionRate}%`
    }
  })

  // Convert to CSV
  const headers = Object.keys(rows[0] || {})
  const csvContent = [
    headers.join(','),
    ...rows.map(row => 
      headers.map(header => 
        `"${String(row[header as keyof SponsorExportRow] || '').replace(/"/g, '""')}"`
      ).join(',')
    )
  ].join('\n')

  return csvContent
}