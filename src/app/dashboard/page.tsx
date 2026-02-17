import { createServerClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Building2,
  FileText,
  Users
} from 'lucide-react'
import { formatDate, getRiskBadgeColor, getStatusBadgeColor } from '@/lib/utils'
import Link from 'next/link'

async function getDashboardData(organizationId: string) {
  const supabase = createServerClient()
  
  // Get upcoming deliverables
  const { data: upcomingDeliverables } = await supabase
    .from('deliverables')
    .select(`
      id,
      title,
      due_date,
      status,
      priority,
      sponsors (
        company_name,
        events (
          name
        )
      )
    `)
    .eq('sponsors.organization_id', organizationId)
    .in('status', ['pending', 'in_progress'])
    .lte('due_date', new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
    .order('due_date')
    .limit(5)

  // Get overdue deliverables
  const { data: overdue } = await supabase
    .from('deliverables')
    .select('id')
    .eq('sponsors.organization_id', organizationId)
    .in('status', ['pending', 'in_progress'])
    .lt('due_date', new Date().toISOString().split('T')[0])

  // Get recent activity
  const { data: recentActivity } = await supabase
    .from('activity_logs')
    .select('*')
    .eq('organization_id', organizationId)
    .order('created_at', { ascending: false })
    .limit(5)

  // Get stats
  const { data: totalSponsors } = await supabase
    .from('sponsors')
    .select('id', { count: 'exact' })
    .eq('organization_id', organizationId)

  const { data: totalDeliverables } = await supabase
    .from('deliverables')
    .select('id', { count: 'exact' })
    .eq('sponsors.organization_id', organizationId)
    .in('status', ['pending', 'in_progress'])

  const { data: completedThisMonth } = await supabase
    .from('deliverables')
    .select('id', { count: 'exact' })
    .eq('sponsors.organization_id', organizationId)
    .eq('status', 'completed')
    .gte('updated_at', new Date(new Date().setDate(1)).toISOString())

  return {
    upcomingDeliverables: upcomingDeliverables || [],
    overdueCount: overdue?.length || 0,
    recentActivity: recentActivity || [],
    stats: {
      totalSponsors: totalSponsors?.length || 0,
      activeDeliverables: totalDeliverables?.length || 0,
      completedThisMonth: completedThisMonth?.length || 0,
      overdueCount: overdue?.length || 0,
    }
  }
}

export default async function DashboardPage() {
  const supabase = createServerClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  // Get user profile and organization
  const { data: profile } = await supabase
    .from('profiles')
    .select('organization_id, organizations (name)')
    .eq('id', user.id)
    .single()

  if (!profile?.organization_id) {
    return (
      <div className="text-center py-8">
        <p>Setting up your organization...</p>
        <Link href="/onboarding">
          <Button>Complete Setup</Button>
        </Link>
      </div>
    )
  }

  const dashboardData = await getDashboardData(profile.organization_id)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your sponsor deliverables.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sponsors</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.stats.totalSponsors}</div>
            <p className="text-xs text-muted-foreground">
              Total sponsors across all events
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Deliverables</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.stats.activeDeliverables}</div>
            <p className="text-xs text-muted-foreground">
              Pending and in-progress items
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed This Month</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{dashboardData.stats.completedThisMonth}</div>
            <p className="text-xs text-muted-foreground">
              Successfully delivered
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{dashboardData.stats.overdueCount}</div>
            <p className="text-xs text-muted-foreground">
              Require immediate attention
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Deliverables */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Upcoming Deliverables</span>
            </CardTitle>
            <CardDescription>
              Deliverables due in the next 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            {dashboardData.upcomingDeliverables.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-500" />
                <p>All caught up! No urgent deliverables.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {dashboardData.upcomingDeliverables.map((deliverable: any) => (
                  <div key={deliverable.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {deliverable.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {deliverable.sponsors?.company_name} • {deliverable.sponsors?.events?.name}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge className={getStatusBadgeColor(deliverable.status)}>
                          {deliverable.status.replace('_', ' ')}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          Due {formatDate(deliverable.due_date)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/deliverables">View All Deliverables</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>
              Latest updates and changes
            </CardDescription>
          </CardHeader>
          <CardContent>
            {dashboardData.recentActivity.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                <p>No recent activity to show.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {dashboardData.recentActivity.map((activity: any) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        {activity.action} {activity.resource_type}
                        {activity.details?.name && ` "${activity.details.name}"`}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(activity.created_at)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks to get you started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild>
              <Link href="/dashboard/events/new">
                <Calendar className="h-4 w-4 mr-2" />
                Create New Event
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard/sponsors/new">
                <Building2 className="h-4 w-4 mr-2" />
                Add Sponsor
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard/risk">
                <AlertTriangle className="h-4 w-4 mr-2" />
                View Risk Dashboard
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}