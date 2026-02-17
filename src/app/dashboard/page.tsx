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
    <div className="space-y-8 max-w-7xl animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Welcome back! 👋
        </h1>
        <p className="text-lg text-gray-600">
          Here's what's happening with your sponsor deliverables today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="glass-card p-6 rounded-2xl border hover:border-indigo-200/50 transition-all group">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Active Sponsors</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardData.stats.totalSponsors}</p>
              <p className="text-xs text-gray-500">Total across all events</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl group-hover:from-blue-200 group-hover:to-indigo-200 transition-all">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border hover:border-purple-200/50 transition-all group">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Active Deliverables</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardData.stats.activeDeliverables}</p>
              <p className="text-xs text-gray-500">Pending and in-progress</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl group-hover:from-purple-200 group-hover:to-pink-200 transition-all">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border hover:border-green-200/50 transition-all group">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Completed This Month</p>
              <p className="text-3xl font-bold text-green-600">{dashboardData.stats.completedThisMonth}</p>
              <p className="text-xs text-gray-500">Successfully delivered</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl group-hover:from-green-200 group-hover:to-emerald-200 transition-all">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border hover:border-red-200/50 transition-all group">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Overdue Items</p>
              <p className="text-3xl font-bold text-red-600">{dashboardData.stats.overdueCount}</p>
              <p className="text-xs text-gray-500">Need immediate attention</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-red-100 to-orange-100 rounded-xl group-hover:from-red-200 group-hover:to-orange-200 transition-all">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        {/* Upcoming Deliverables */}
        <div className="glass-card rounded-2xl border hover:border-indigo-200/50 transition-all">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl">
                <Clock className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Upcoming Deliverables</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Deliverables due in the next 7 days
            </p>
          </div>
          <div className="p-6">
            {dashboardData.upcomingDeliverables.length === 0 ? (
              <div className="text-center py-12">
                <div className="p-4 bg-green-50 rounded-full w-fit mx-auto mb-4">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">All caught up!</h4>
                <p className="text-gray-500">No urgent deliverables in the next 7 days.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {dashboardData.upcomingDeliverables.map((deliverable: any) => (
                  <div key={deliverable.id} className="p-4 bg-white/60 border border-gray-100 rounded-xl hover:border-indigo-200/50 hover:shadow-sm transition-all">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate mb-1">
                          {deliverable.title}
                        </p>
                        <p className="text-sm text-gray-600 mb-3">
                          {deliverable.sponsors?.company_name} • {deliverable.sponsors?.events?.name}
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(deliverable.status)}`}>
                            {deliverable.status.replace('_', ' ')}
                          </span>
                          <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                            Due {formatDate(deliverable.due_date)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full btn-modern mt-4 h-12 border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50/50" asChild>
                  <Link href="/dashboard/deliverables">View All Deliverables</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-card rounded-2xl border hover:border-purple-200/50 transition-all">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Latest updates and changes
            </p>
          </div>
          <div className="p-6">
            {dashboardData.recentActivity.length === 0 ? (
              <div className="text-center py-12">
                <div className="p-4 bg-gray-50 rounded-full w-fit mx-auto mb-4">
                  <TrendingUp className="h-12 w-12 text-gray-400" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">No activity yet</h4>
                <p className="text-gray-500">Recent actions will appear here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {dashboardData.recentActivity.map((activity: any) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 bg-white/60 border border-gray-100 rounded-xl">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 mb-1">
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
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-card rounded-2xl border hover:border-indigo-200/50 transition-all">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Quick Actions</h3>
          <p className="text-gray-600 text-sm">
            Common tasks to get you started
          </p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button className="h-14 btn-modern bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25" asChild>
              <Link href="/dashboard/events/new" className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span className="font-medium">Create New Event</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-14 btn-modern border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/50" asChild>
              <Link href="/dashboard/sponsors/new" className="flex items-center space-x-2">
                <Building2 className="h-5 w-5" />
                <span className="font-medium">Add Sponsor</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-14 btn-modern border-gray-200 hover:border-red-200 hover:bg-red-50/50" asChild>
              <Link href="/dashboard/risk" className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span className="font-medium">View Risk Dashboard</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}