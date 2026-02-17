import { createServerClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Building2, Mail, Phone, Globe, Plus, Eye, Edit, DollarSign } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'
import Link from 'next/link'

async function getSponsors(organizationId: string) {
  const supabase = createServerClient()
  
  const { data: sponsors, error } = await supabase
    .from('sponsors')
    .select(`
      id,
      company_name,
      contact_name,
      contact_email,
      contact_phone,
      website,
      contract_value,
      payment_status,
      created_at,
      events (
        id,
        name,
        event_date
      ),
      sponsor_package_templates (
        name,
        tier
      ),
      deliverables (
        id,
        status,
        due_date
      )
    `)
    .eq('organization_id', organizationId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching sponsors:', error)
    return []
  }

  return sponsors || []
}

function getPaymentStatusColor(status: string) {
  switch (status) {
    case 'confirmed':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'overdue':
      return 'bg-red-100 text-red-800'
    case 'cancelled':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

function getTierColor(tier: string) {
  switch (tier) {
    case 'platinum':
      return 'bg-purple-100 text-purple-800'
    case 'gold':
      return 'bg-yellow-100 text-yellow-800'
    case 'silver':
      return 'bg-gray-100 text-gray-800'
    case 'bronze':
      return 'bg-orange-100 text-orange-800'
    default:
      return 'bg-blue-100 text-blue-800'
  }
}

export default async function SponsorsPage() {
  const supabase = createServerClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('organization_id')
    .eq('id', user.id)
    .single()

  if (!profile?.organization_id) return null

  const sponsors = await getSponsors(profile.organization_id)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sponsors</h1>
          <p className="text-gray-600">
            Manage your sponsor relationships and deliverables
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/sponsors/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Sponsor
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      {sponsors.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sponsors</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sponsors.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confirmed Payments</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {sponsors.filter(s => s.payment_status === 'confirmed').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Contract Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(
                  sponsors.reduce((sum, sponsor) => sum + (sponsor.contract_value || 0), 0)
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Deliverables</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {sponsors.reduce((sum, sponsor) => 
                  sum + (sponsor.deliverables?.filter(d => 
                    d.status === 'pending' || d.status === 'in_progress'
                  ).length || 0), 0
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Sponsors Grid */}
      {sponsors.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No sponsors yet</h3>
            <p className="text-gray-600 mb-4">
              Add your first sponsor to start tracking deliverables
            </p>
            <Button asChild>
              <Link href="/dashboard/sponsors/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Sponsor
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sponsors.map((sponsor: any) => {
            const totalDeliverables = sponsor.deliverables?.length || 0
            const completedDeliverables = sponsor.deliverables?.filter((d: any) => d.status === 'completed').length || 0
            const overdueDeliverables = sponsor.deliverables?.filter((d: any) => 
              d.status !== 'completed' && new Date(d.due_date) < new Date()
            ).length || 0
            
            const completionRate = totalDeliverables > 0 ? 
              Math.round((completedDeliverables / totalDeliverables) * 100) : 0

            return (
              <Card key={sponsor.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <CardTitle className="text-lg">{sponsor.company_name}</CardTitle>
                      <div className="flex space-x-2">
                        {sponsor.sponsor_package_templates && (
                          <Badge className={getTierColor(sponsor.sponsor_package_templates.tier)}>
                            {sponsor.sponsor_package_templates.name}
                          </Badge>
                        )}
                        <Badge className={getPaymentStatusColor(sponsor.payment_status)}>
                          {sponsor.payment_status?.replace('_', ' ') || 'pending'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Event Info */}
                  <div className="text-sm text-gray-600">
                    <p><strong>Event:</strong> {sponsor.events?.name || 'N/A'}</p>
                    {sponsor.events?.event_date && (
                      <p><strong>Date:</strong> {formatDate(sponsor.events.event_date)}</p>
                    )}
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-1">
                    {sponsor.contact_name && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span>{sponsor.contact_name}</span>
                      </div>
                    )}
                    {sponsor.contact_email && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail className="h-3 w-3" />
                        <span className="truncate">{sponsor.contact_email}</span>
                      </div>
                    )}
                    {sponsor.contact_phone && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="h-3 w-3" />
                        <span>{sponsor.contact_phone}</span>
                      </div>
                    )}
                    {sponsor.website && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Globe className="h-3 w-3" />
                        <a href={sponsor.website} target="_blank" rel="noopener noreferrer" 
                           className="text-blue-600 hover:underline truncate">
                          {sponsor.website}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Contract Value */}
                  {sponsor.contract_value && (
                    <div className="text-sm">
                      <span className="text-gray-600">Contract Value: </span>
                      <span className="font-medium">{formatCurrency(sponsor.contract_value)}</span>
                    </div>
                  )}

                  {/* Deliverables Summary */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span>Deliverables Progress:</span>
                      <span className="font-medium">{completionRate}%</span>
                    </div>
                    <div className="mt-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${completionRate === 100 ? 'bg-green-500' : completionRate > 50 ? 'bg-blue-500' : 'bg-yellow-500'}`}
                        style={{ width: `${completionRate}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>{completedDeliverables}/{totalDeliverables} completed</span>
                      {overdueDeliverables > 0 && (
                        <span className="text-red-600">{overdueDeliverables} overdue</span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <Link href={`/dashboard/sponsors/${sponsor.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <Link href={`/dashboard/sponsors/${sponsor.id}/edit`}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}