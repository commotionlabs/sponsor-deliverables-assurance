import { createServerClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Clock, XCircle, CheckCircle, Calendar, Building2 } from 'lucide-react'
import { formatDate, getRiskLevel, getRiskBadgeColor, getStatusBadgeColor } from '@/lib/utils'
import Link from 'next/link'

async function getRiskData(organizationId: string) {
  const supabase = createServerClient()
  
  // Get all active deliverables with sponsor and event info
  const { data: deliverables } = await supabase
    .from('deliverables')
    .select(`
      id,
      title,
      description,
      due_date,
      status,
      priority,
      assigned_to,
      sponsors (
        id,
        company_name,
        events (
          id,
          name,
          event_date
        )
      ),
      profiles (
        full_name,
        email
      )
    `)
    .eq('sponsors.organization_id', organizationId)
    .in('status', ['pending', 'in_progress', 'blocked'])
    .order('due_date')

  if (!deliverables) return { overdue: [], dueSoon: [], blocked: [], upcoming: [] }

  const today = new Date().toISOString().split('T')[0]
  const threeDaysFromNow = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  const sevenDaysFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

  const categorized = {
    overdue: deliverables.filter((d: any) => d.due_date < today && d.status !== 'completed'),
    dueSoon: deliverables.filter((d: any) => 
      d.due_date >= today && 
      d.due_date <= threeDaysFromNow && 
      d.status !== 'completed' && 
      d.status !== 'blocked'
    ),
    blocked: deliverables.filter((d: any) => d.status === 'blocked'),
    upcoming: deliverables.filter((d: any) => 
      d.due_date > threeDaysFromNow && 
      d.due_date <= sevenDaysFromNow && 
      d.status !== 'completed' && 
      d.status !== 'blocked'
    )
  }

  return categorized
}

function RiskSection({ 
  title, 
  description, 
  items, 
  icon: Icon, 
  emptyMessage,
  riskLevel = 'medium'
}: any) {
  const getRiskSectionColor = (level: string) => {
    switch (level) {
      case 'critical': return 'border-red-200 bg-red-50'
      case 'high': return 'border-orange-200 bg-orange-50'
      case 'medium': return 'border-yellow-200 bg-yellow-50'
      default: return 'border-blue-200 bg-blue-50'
    }
  }

  return (
    <Card className={getRiskSectionColor(riskLevel)}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Icon className="h-5 w-5" />
          <span>{title}</span>
          <Badge variant="secondary">{items.length}</Badge>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-gray-500 text-center py-4">{emptyMessage}</p>
        ) : (
          <div className="space-y-4">
            {items.map((item: any) => (
              <div key={item.id} className="border border-white rounded-lg p-4 bg-white">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  <Badge className={getStatusBadgeColor(item.status)}>
                    {item.status.replace('_', ' ')}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-4 w-4" />
                    <span>{item.sponsors?.company_name}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Event: {item.sponsors?.events?.name}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Due: {formatDate(item.due_date)}</span>
                    {item.profiles && (
                      <span>Assigned: {item.profiles.full_name || item.profiles.email}</span>
                    )}
                  </div>
                </div>
                
                {item.description && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default async function RiskDashboardPage() {
  const supabase = createServerClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('organization_id')
    .eq('id', user.id)
    .single()

  if (!profile?.organization_id) return null

  const riskData = await getRiskData(profile.organization_id)
  const totalRiskyItems = riskData.overdue.length + riskData.dueSoon.length + riskData.blocked.length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Risk Dashboard</h1>
          <p className="text-gray-600">
            Monitor deliverables that need immediate attention
          </p>
        </div>
        {totalRiskyItems > 0 && (
          <Badge variant="destructive" className="text-lg px-4 py-2">
            {totalRiskyItems} items need attention
          </Badge>
        )}
      </div>

      {/* Risk Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-red-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-red-700">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{riskData.overdue.length}</div>
            <p className="text-xs text-red-600 mt-1">Requires immediate action</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-orange-700">Due Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{riskData.dueSoon.length}</div>
            <p className="text-xs text-orange-600 mt-1">Due within 3 days</p>
          </CardContent>
        </Card>

        <Card className="border-yellow-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-yellow-700">Blocked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{riskData.blocked.length}</div>
            <p className="text-xs text-yellow-600 mt-1">Waiting for resolution</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-blue-700">Upcoming</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{riskData.upcoming.length}</div>
            <p className="text-xs text-blue-600 mt-1">Due within 7 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Risk Sections */}
      <div className="space-y-6">
        <RiskSection
          title="Overdue Deliverables"
          description="These deliverables are past their due date and require immediate attention"
          items={riskData.overdue}
          icon={XCircle}
          emptyMessage="🎉 No overdue deliverables!"
          riskLevel="critical"
        />

        <RiskSection
          title="Due Soon"
          description="Deliverables due within the next 3 days"
          items={riskData.dueSoon}
          icon={Clock}
          emptyMessage="No deliverables due in the next 3 days"
          riskLevel="high"
        />

        <RiskSection
          title="Blocked Deliverables"
          description="Deliverables that are blocked and need resolution"
          items={riskData.blocked}
          icon={AlertTriangle}
          emptyMessage="No blocked deliverables"
          riskLevel="medium"
        />

        <RiskSection
          title="Upcoming This Week"
          description="Deliverables due within the next 7 days"
          items={riskData.upcoming}
          icon={Calendar}
          emptyMessage="No deliverables due this week"
          riskLevel="low"
        />
      </div>

      {/* Actions */}
      {totalRiskyItems === 0 && (
        <Card className="text-center py-12 bg-green-50 border-green-200">
          <CardContent>
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">All Clear!</h3>
            <p className="text-gray-600 mb-4">
              No deliverables require immediate attention. Great job keeping on top of things!
            </p>
            <div className="space-x-4">
              <Button asChild>
                <Link href="/dashboard/deliverables">View All Deliverables</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/dashboard/sponsors">Manage Sponsors</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}