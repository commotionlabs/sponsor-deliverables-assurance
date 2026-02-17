'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Shield, Loader2, CheckCircle, Building2, Calendar, Users } from 'lucide-react'
import { generateSlug } from '@/lib/utils'

export default function OnboardingPage() {
  const router = useRouter()
  const supabase = createClient()
  
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [organizationData, setOrganizationData] = useState({
    name: '',
    description: '',
    website: ''
  })

  const handleOrganizationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      // Check if user already has an organization
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('organization_id, organizations (name)')
        .eq('id', user.id)
        .single()

      if (existingProfile?.organization_id) {
        // User already has an organization, redirect to dashboard
        router.push('/dashboard')
        return
      }

      // Create organization
      const slug = generateSlug(organizationData.name)
      const { data: organization, error: orgError } = await supabase
        .from('organizations')
        .insert({
          name: organizationData.name,
          slug,
          description: organizationData.description || null,
          website: organizationData.website || null,
        })
        .select()
        .single()

      if (orgError) throw orgError

      // Create or update user profile
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          organization_id: organization.id,
          email: user.email!,
          full_name: user.user_metadata?.full_name || null,
          role: 'admin',
          is_active: true
        })

      if (profileError) throw profileError

      // Copy default deliverable templates to the organization
      const { data: defaultTemplates } = await supabase
        .from('deliverable_templates')
        .select('*')
        .is('organization_id', null)

      if (defaultTemplates && defaultTemplates.length > 0) {
        const orgTemplates = defaultTemplates.map(template => ({
          ...template,
          id: undefined, // Remove ID to create new records
          organization_id: organization.id
        }))

        await supabase
          .from('deliverable_templates')
          .insert(orgTemplates)
      }

      // Copy default sponsor package templates
      const defaultPackages = [
        {
          organization_id: organization.id,
          name: 'Bronze Partnership',
          tier: 'bronze' as const,
          price: 50000, // $500
          description: 'Entry-level sponsorship with basic brand exposure',
          benefits: ["Logo on event materials", "Social media mention", "Program listing"],
          deliverables_template: ["Logo Placement Confirmation", "Social Media Mention", "Program Listing"]
        },
        {
          organization_id: organization.id,
          name: 'Silver Partnership', 
          tier: 'silver' as const,
          price: 150000, // $1,500
          description: 'Mid-tier sponsorship with enhanced visibility',
          benefits: ["Premium logo placement", "Booth space", "Social media campaign", "Speaking opportunity"],
          deliverables_template: ["Logo Placement Confirmation", "Social Media Campaign", "Program Listing", "Booth Setup Coordination", "Speaking Slot Confirmation"]
        },
        {
          organization_id: organization.id,
          name: 'Gold Partnership',
          tier: 'gold' as const, 
          price: 300000, // $3,000
          description: 'Premium sponsorship with VIP benefits',
          benefits: ["VIP reception", "Premium booth location", "Dedicated marketing", "Lead generation", "Media coverage"],
          deliverables_template: ["VIP Reception Planning", "Premium Logo Placement", "Media Kit Preparation", "Dedicated Social Campaign", "Lead Generation Report", "Premium Booth Location"]
        },
        {
          organization_id: organization.id,
          name: 'Platinum Partnership',
          tier: 'platinum' as const,
          price: 500000, // $5,000
          description: 'Exclusive top-tier partnership',
          benefits: ["Exclusive partnership status", "Custom branded experience", "Executive access", "Year-round benefits", "ROI reporting"],
          deliverables_template: ["Exclusive Partnership Announcement", "Custom Branded Experience", "Executive Meeting Coordination", "Post-Event ROI Report", "Year-Round Partnership Benefits"]
        }
      ]

      await supabase
        .from('sponsor_package_templates')
        .insert(defaultPackages)

      // Log activity
      await supabase
        .from('activity_logs')
        .insert({
          organization_id: organization.id,
          user_id: user.id,
          action: 'created',
          resource_type: 'organization',
          resource_id: organization.id,
          details: { organization_name: organizationData.name }
        })

      setStep(2)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleComplete = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <Shield className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-black">SponsorAssure</span>
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Welcome to SponsorAssure!</CardTitle>
              <CardDescription className="text-center">
                Let's set up your organization to start managing sponsor deliverables
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleOrganizationSubmit} className="space-y-6">
                {/* Organization Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Organization Name *</Label>
                  <Input
                    id="name"
                    placeholder="Acme Events"
                    value={organizationData.name}
                    onChange={(e) => setOrganizationData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell us about your organization..."
                    value={organizationData.description}
                    onChange={(e) => setOrganizationData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>

                {/* Website */}
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://acmeevents.com"
                    value={organizationData.website}
                    onChange={(e) => setOrganizationData(prev => ({ ...prev, website: e.target.value }))}
                  />
                </div>

                {/* What you get */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">What we'll set up for you:</h3>
                  <ul className="space-y-1 text-sm text-blue-800">
                    <li>• Pre-configured sponsor package templates (Bronze, Silver, Gold, Platinum)</li>
                    <li>• Deliverable templates for each sponsorship tier</li>
                    <li>• Your organization dashboard with sample data</li>
                    <li>• 14-day free trial with full access</li>
                  </ul>
                </div>

                {/* Error Display */}
                {error && (
                  <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                    {error}
                  </div>
                )}

                {/* Actions */}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Organization
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader className="text-center">
              <CheckCircle className="mx-auto h-16 w-16 text-green-600 mb-4" />
              <CardTitle className="text-2xl">You're All Set!</CardTitle>
              <CardDescription>
                Your organization has been created with everything you need to start managing sponsor deliverables
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Success message */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">Successfully created:</h3>
                <ul className="space-y-1 text-sm text-green-800">
                  <li>• Your organization: {organizationData.name}</li>
                  <li>• 4 sponsor package templates</li>
                  <li>• 20+ deliverable templates</li>
                  <li>• Admin account setup</li>
                </ul>
              </div>

              {/* Next steps */}
              <div className="space-y-4">
                <h3 className="font-medium text-black">Next steps:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-white border rounded-lg">
                    <Calendar className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="font-medium text-sm">Create Event</p>
                      <p className="text-xs text-gray-600">Add your first event</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white border rounded-lg">
                    <Building2 className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="font-medium text-sm">Add Sponsors</p>
                      <p className="text-xs text-gray-600">Import your sponsors</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white border rounded-lg">
                    <Users className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="font-medium text-sm">Invite Team</p>
                      <p className="text-xs text-gray-600">Add team members</p>
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={handleComplete} className="w-full">
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}