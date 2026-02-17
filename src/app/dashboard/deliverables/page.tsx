import { createServerClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  FileText, 
  Search, 
  Filter, 
  Calendar, 
  Building2, 
  User, 
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Download
} from 'lucide-react'
import { formatDate, getStatusBadgeColor, getRiskLevel, getRiskBadgeColor } from '@/lib/utils'
import Link from 'next/link'

async function getDeliverables(organizationId: string) {
  const supabase = createServerClient()
  
  const { data: deliverables, error } = await supabase
    .from('deliverables')
    .select(`
      id,
      title,
      description,
      due_date,
      status,
      priority,
      completion_notes,
      created_at,
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
    .order('due_date')

  if (error) {
    console.error('Error fetching deliverables:', error)
    return []
  }

  return deliverables || []
}

function DeliverableCard({ deliverable }: { deliverable: any }) {
  const risk = getRiskLevel(deliverable.due_date, deliverable.status)
  const today = new Date().toISOString().split('T')[0]
  const isOverdue = deliverable.due_date < today && deliverable.status !== 'completed'
  const daysUntilDue = Math.ceil((new Date(deliverable.due_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className={`glass-card p-6 rounded-2xl border transition-all hover:shadow-lg ${
      isOverdue ? 'border-red-200/80 bg-red-50/50' : 'hover:border-indigo-200/50'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate mb-2">{deliverable.title}</h3>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(deliverable.status)}`}>
              {deliverable.status.replace('_', ' ')}
            </span>
            {risk !== 'none' && (
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskBadgeColor(risk)}`}>
                {risk}
              </span>
            )}
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 capitalize">
              {deliverable.priority || 'medium'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Sponsor & Event Info */}
        <div className="space-y-1 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Building2 className="h-4 w-4" />
            <span>{deliverable.sponsors?.company_name || 'Unknown Sponsor'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>{deliverable.sponsors?.events?.name || 'Unknown Event'}</span>
          </div>
        </div>

        {/* Due Date */}
        <div className={`text-sm ${isOverdue ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>
              Due {formatDate(deliverable.due_date)}
              {daysUntilDue === 0 && ' (Today)'}
              {daysUntilDue === 1 && ' (Tomorrow)'}
              {daysUntilDue < 0 && ` (${Math.abs(daysUntilDue)} days overdue)`}
              {daysUntilDue > 1 && ` (in ${daysUntilDue} days)`}
            </span>
          </div>
        </div>

        {/* Assignee */}
        {deliverable.profiles && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <User className="h-4 w-4" />
            <span>Assigned to {deliverable.profiles.full_name || deliverable.profiles.email}</span>
          </div>
        )}

        {/* Description */}
        {deliverable.description && (
          <p className="text-sm text-gray-600 line-clamp-2">{deliverable.description}</p>
        )}

        {/* Completion Notes */}
        {deliverable.completion_notes && deliverable.status === 'completed' && (
          <div className="bg-green-50 p-2 rounded text-sm">
            <p className="text-green-800">
              <strong>Completed:</strong> {deliverable.completion_notes}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default async function DeliverablesPage() {
  const supabase = createServerClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('organization_id')
    .eq('id', user.id)
    .single()

  if (!profile?.organization_id) return null

  const deliverables = await getDeliverables(profile.organization_id)
  
  // Calculate stats
  const stats = {
    total: deliverables.length,
    completed: deliverables.filter(d => d.status === 'completed').length,
    overdue: deliverables.filter(d => {
      const today = new Date().toISOString().split('T')[0]
      return d.due_date < today && d.status !== 'completed'
    }).length,
    dueSoon: deliverables.filter(d => {
      const today = new Date()
      const threeDays = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      const todayStr = today.toISOString().split('T')[0]
      return d.due_date >= todayStr && d.due_date <= threeDays && d.status !== 'completed'
    }).length
  }

  return (
    <div className="space-y-8 max-w-7xl animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Deliverables</h1>
          <p className="text-lg text-gray-600">
            Track and manage all sponsor deliverables across your events
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="btn-modern border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/50" asChild>
            <Link href="/api/export/deliverables" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export CSV</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="glass-card p-6 rounded-2xl border hover:border-blue-200/50 transition-all group">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Total Deliverables</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl group-hover:from-blue-200 group-hover:to-indigo-200 transition-all">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border hover:border-green-200/50 transition-all group">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
              <p className="text-xs text-gray-500">
                {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}% completion rate
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl group-hover:from-green-200 group-hover:to-emerald-200 transition-all">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border hover:border-red-200/50 transition-all group">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-3xl font-bold text-red-600">{stats.overdue}</p>
              <p className="text-xs text-gray-500">Need immediate attention</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-red-100 to-orange-100 rounded-xl group-hover:from-red-200 group-hover:to-orange-200 transition-all">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border hover:border-orange-200/50 transition-all group">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Due Soon</p>
              <p className="text-3xl font-bold text-orange-600">{stats.dueSoon}</p>
              <p className="text-xs text-gray-500">Due within 3 days</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl group-hover:from-orange-200 group-hover:to-yellow-200 transition-all">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card rounded-2xl border hover:border-indigo-200/50 transition-all">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">Filter & Search</h3>
        </div>
        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search deliverables..."
                  className="pl-10 h-12 bg-white/80 border-gray-200 focus:border-indigo-300 focus:ring-indigo-200"
                />
              </div>
            </div>
            <Button variant="outline" className="btn-modern border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/50 h-12 px-6">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </div>

      {/* Deliverables List */}
      {deliverables.length === 0 ? (
        <div className="glass-card rounded-2xl border text-center py-16">
          <div className="p-4 bg-blue-50 rounded-full w-fit mx-auto mb-6">
            <FileText className="h-12 w-12 text-blue-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">No deliverables yet</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Deliverables will appear here when you add sponsors to your events
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="btn-modern bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25" asChild>
              <Link href="/dashboard/events/new">Create Event</Link>
            </Button>
            <Button variant="outline" className="btn-modern border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/50" asChild>
              <Link href="/dashboard/sponsors/new">Add Sponsor</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {deliverables.map((deliverable) => (
            <DeliverableCard key={deliverable.id} deliverable={deliverable} />
          ))}
        </div>
      )}

      {/* Quick Actions */}
      {deliverables.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks for managing deliverables
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" asChild>
                <Link href="/dashboard/risk">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  View Risk Dashboard
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/dashboard/sponsors">
                  <Building2 className="h-4 w-4 mr-2" />
                  Manage Sponsors
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/dashboard/templates">
                  <FileText className="h-4 w-4 mr-2" />
                  Edit Templates
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}