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
    <Card className={`hover:shadow-md transition-shadow ${isOverdue ? 'border-red-200 bg-red-50' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-medium truncate">{deliverable.title}</CardTitle>
            <div className="flex items-center space-x-2 mt-2">
              <Badge className={getStatusBadgeColor(deliverable.status)}>
                {deliverable.status.replace('_', ' ')}
              </Badge>
              {risk !== 'none' && (
                <Badge className={getRiskBadgeColor(risk)}>
                  {risk}
                </Badge>
              )}
              <Badge variant="outline" className="capitalize">
                {deliverable.priority || 'medium'}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
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
      </CardContent>
    </Card>
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Deliverables</h1>
          <p className="text-gray-600">
            Track and manage all sponsor deliverables across your events
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link href="/api/export/deliverables">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deliverables</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <p className="text-xs text-muted-foreground">
              {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
            <p className="text-xs text-muted-foreground">
              Need immediate attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due Soon</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.dueSoon}</div>
            <p className="text-xs text-muted-foreground">
              Due within 3 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filter & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search deliverables..."
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Deliverables List */}
      {deliverables.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No deliverables yet</h3>
            <p className="text-gray-600 mb-4">
              Deliverables will appear here when you add sponsors to your events
            </p>
            <div className="space-x-4">
              <Button asChild>
                <Link href="/dashboard/events/new">Create Event</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/dashboard/sponsors/new">Add Sponsor</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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