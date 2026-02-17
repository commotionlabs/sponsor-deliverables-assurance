import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Shield, Calendar, FileText, BarChart3, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">SponsorAssure</span>
          </div>
          <div className="space-x-4">
            <Button variant="outline" asChild>
              <Link href="/auth/sign-in">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/sign-up">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4" variant="secondary">
            💰 Save sponsor relationships worth $100K+
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Never Miss Another 
            <span className="text-blue-600"> Sponsor Deliverable</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Event teams use SponsorAssure to track deliverables, avoid missed obligations, 
            and protect sponsor renewals with automated reminders and risk dashboards.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" className="text-lg px-8 py-4" asChild>
              <Link href="/auth/sign-up">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4">
              Watch Demo
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">98%</div>
              <div className="text-gray-600">Deliverable completion rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">$50K</div>
              <div className="text-gray-600">Average sponsor value protected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">14 days</div>
              <div className="text-gray-600">Average setup time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              The Cost of Missed Sponsor Deliverables
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-600">⚠️ The Problem</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-left space-y-2 text-gray-600">
                    <li>• Sponsor deliverables slip through cracks</li>
                    <li>• Manual tracking in spreadsheets fails</li>
                    <li>• Last-minute scrambles damage relationships</li>
                    <li>• Renewals at risk from unmet promises</li>
                    <li>• Team accountability unclear</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-600">✅ The Solution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-left space-y-2 text-gray-600">
                    <li>• Automated deadline tracking & reminders</li>
                    <li>• Clear owner assignment & responsibility</li>
                    <li>• Risk dashboard highlights urgent items</li>
                    <li>• Fulfillment proof for sponsor relations</li>
                    <li>• Templates for consistent delivery</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Protect Sponsor Relationships
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built specifically for event teams managing sponsor deliverables
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Calendar className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Smart Deadline Tracking</CardTitle>
                <CardDescription>
                  Automatic reminders ensure nothing falls through the cracks
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Risk Dashboard</CardTitle>
                <CardDescription>
                  See overdue, upcoming, and blocked deliverables at a glance
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <FileText className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Package Templates</CardTitle>
                <CardDescription>
                  Pre-built deliverable templates for Bronze, Silver, Gold, Platinum tiers
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <CheckCircle className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Completion Tracking</CardTitle>
                <CardDescription>
                  Evidence collection and proof of fulfillment for sponsor reports
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <Zap className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Team Assignment</CardTitle>
                <CardDescription>
                  Clear ownership and accountability for every deliverable
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Export Reports</CardTitle>
                <CardDescription>
                  Professional fulfillment reports for sponsor relations
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Start protecting your sponsor relationships today
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <CardDescription>Perfect for single event teams</CardDescription>
                <div className="text-3xl font-bold text-gray-900">$299<span className="text-lg font-normal text-gray-600">/mo</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 1 event</li>
                  <li>• Up to 50 sponsors</li>
                  <li>• 3 team members</li>
                  <li>• Basic dashboard</li>
                  <li>• Email reminders</li>
                  <li>• CSV exports</li>
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-blue-500 relative">
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2" variant="default">
                Most Popular
              </Badge>
              <CardHeader>
                <CardTitle>Growth</CardTitle>
                <CardDescription>Ideal for multi-event operations</CardDescription>
                <div className="text-3xl font-bold text-gray-900">$499<span className="text-lg font-normal text-gray-600">/mo</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 5 events</li>
                  <li>• Up to 200 sponsors</li>
                  <li>• 10 team members</li>
                  <li>• Advanced dashboard</li>
                  <li>• Custom templates</li>
                  <li>• PDF reports</li>
                  <li>• Priority support</li>
                </ul>
                <Button className="w-full mt-6">
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>For large organizations</CardDescription>
                <div className="text-3xl font-bold text-gray-900">$999<span className="text-lg font-normal text-gray-600">/mo</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Unlimited events</li>
                  <li>• Unlimited sponsors</li>
                  <li>• Unlimited users</li>
                  <li>• White-label options</li>
                  <li>• API access</li>
                  <li>• Custom integrations</li>
                  <li>• Dedicated support</li>
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Protect Your Sponsor Relationships?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join event teams using SponsorAssure to ensure deliverable completion and protect renewals
          </p>
          <div className="space-x-4">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4" asChild>
              <Link href="/auth/sign-up">Start Free 14-Day Trial</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-blue-600">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6" />
                <span className="text-lg font-bold">SponsorAssure</span>
              </div>
              <p className="text-gray-400">
                Protecting sponsor relationships through deliverable assurance.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">Features</Link></li>
                <li><Link href="#" className="hover:text-white">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white">Contact</Link></li>
                <li><Link href="#" className="hover:text-white">Status</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">About</Link></li>
                <li><Link href="#" className="hover:text-white">Blog</Link></li>
                <li><Link href="#" className="hover:text-white">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SponsorAssure. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}