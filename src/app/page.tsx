import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Shield, Calendar, FileText, BarChart3, Zap, ArrowRight, Star, Users, TrendingUp } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-black rounded-lg transition-all group-hover:bg-gray-800">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-black">
              SponsorAssure
            </span>
          </Link>
          <div className="hidden sm:flex items-center space-x-3">
            <Button variant="ghost" className="btn-premium text-gray-600 hover:text-black" asChild>
              <Link href="/auth/sign-in">Sign In</Link>
            </Button>
            <Button className="btn-premium bg-blue-600 hover:bg-blue-700 text-white" asChild>
              <Link href="/auth/sign-up" className="flex items-center space-x-2">
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="sm:hidden">
            <Button size="sm" className="btn-premium bg-blue-600 hover:bg-blue-700 text-white" asChild>
              <Link href="/auth/sign-up">Start Free</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-24 sm:pb-32 text-center">
          <div className="max-w-5xl mx-auto animate-fade-in">
            <div className="mb-6 inline-flex items-center px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-700">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Save sponsor relationships worth $100K+
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight animate-slide-up text-black">
              Never Miss Another
              <br />
              Sponsor Deliverable
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto animate-slide-up">
              Event teams use SponsorAssure to track deliverables, avoid missed obligations, 
              and protect sponsor renewals with automated reminders and intelligent risk dashboards.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16 animate-slide-up">
              <Button 
                size="lg" 
                className="btn-premium text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto" 
                asChild
              >
                <Link href="/auth/sign-up" className="flex items-center space-x-2">
                  <span>Start Free Trial</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="btn-premium text-lg px-8 py-4 border-gray-200 hover:border-gray-300 hover:bg-gray-50 w-full sm:w-auto"
              >
                <span className="flex items-center space-x-2">
                  <span>Watch Demo</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </span>
              </Button>
            </div>
            
            {/* Enhanced Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 animate-slide-up">
              <div className="premium-card p-6 rounded-lg text-center bg-white border border-gray-200">
                <div className="text-4xl font-bold text-black mb-2">98%</div>
                <div className="text-sm font-medium text-gray-700">Deliverable completion rate</div>
                <div className="text-xs text-gray-500 mt-1">Industry-leading accuracy</div>
              </div>
              <div className="premium-card p-6 rounded-lg text-center bg-white border border-gray-200">
                <div className="text-4xl font-bold text-black mb-2">$50K</div>
                <div className="text-sm font-medium text-gray-700">Average sponsor value protected</div>
                <div className="text-xs text-gray-500 mt-1">Per client relationship</div>
              </div>
              <div className="premium-card p-6 rounded-lg text-center bg-white border border-gray-200">
                <div className="text-4xl font-bold text-black mb-2">7</div>
                <div className="text-sm font-medium text-gray-700">Days to full setup</div>
                <div className="text-xs text-gray-500 mt-1">Get started instantly</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="relative py-20 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6">
              The Cost of Missed Sponsor Deliverables
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              One missed deliverable can cost your event thousands in lost renewals. Here's how we solve that.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Problem Card */}
            <div className="premium-card p-8 rounded-lg border border-red-200 bg-white">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-red-50 rounded-lg mr-4">
                  <div className="text-2xl">⚠️</div>
                </div>
                <h3 className="text-2xl font-bold text-red-700">The Problem</h3>
              </div>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Sponsor deliverables slip through the cracks</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Manual tracking in spreadsheets consistently fails</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Last-minute scrambles damage sponsor relationships</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Renewals at risk from unmet promises and commitments</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Team accountability and ownership remains unclear</span>
                </li>
              </ul>
            </div>
            
            {/* Solution Card */}
            <div className="premium-card p-8 rounded-lg border border-green-200 bg-white">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-green-50 rounded-lg mr-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-700">The Solution</h3>
              </div>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Automated deadline tracking with smart reminders</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Clear owner assignment with responsibility tracking</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Risk dashboard highlighting urgent deliverables</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Fulfillment proof for transparent sponsor relations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Pre-built templates ensuring consistent delivery</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20">
            <div className="mb-6 inline-flex items-center px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-700">
              <Zap className="h-4 w-4 mr-2" />
              Powerful Features
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6">
              Everything You Need to Protect
              <br className="hidden sm:block" />
              Sponsor Relationships
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Built specifically for event teams managing sponsor deliverables with enterprise-grade reliability
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            <div className="premium-card p-8 rounded-lg border border-gray-200 bg-white">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-50 rounded-lg mr-4">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-1">Smart Deadline Tracking</h3>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Intelligent reminders and deadline management ensure nothing falls through the cracks with customizable alert schedules.
              </p>
            </div>
            
            <div className="premium-card p-8 rounded-lg border border-gray-200 bg-white">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-50 rounded-lg mr-4">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-1">Risk Dashboard</h3>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Visual risk assessment with real-time insights into overdue, upcoming, and blocked deliverables at a glance.
              </p>
            </div>
            
            <div className="premium-card p-8 rounded-lg border border-gray-200 bg-white">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-50 rounded-lg mr-4">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-1">Package Templates</h3>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Pre-built deliverable templates for Bronze, Silver, Gold, and Platinum sponsor tiers with customization options.
              </p>
            </div>
            
            <div className="premium-card p-8 rounded-lg border border-gray-200 bg-white">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-green-50 rounded-lg mr-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-1">Completion Tracking</h3>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Evidence collection and proof of fulfillment with photo uploads, timestamps, and detailed sponsor reports.
              </p>
            </div>
            
            <div className="premium-card p-8 rounded-lg border border-gray-200 bg-white">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gray-50 rounded-lg mr-4">
                  <Users className="h-8 w-8 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-1">Team Assignment</h3>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Clear ownership and accountability for every deliverable with role-based permissions and collaboration tools.
              </p>
            </div>
            
            <div className="premium-card p-8 rounded-lg border border-gray-200 bg-white">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-50 rounded-lg mr-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-1">Export Reports</h3>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Professional fulfillment reports with branded PDF exports perfect for sponsor relations and renewals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative py-20 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your event team. Start protecting your sponsor relationships today.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Starter Plan */}
            <div className="premium-card p-8 rounded-lg border border-gray-200 bg-white">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-black mb-2">Starter</h3>
                <p className="text-gray-600 mb-6">Perfect for single event teams getting started</p>
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl font-bold text-black">$299</span>
                  <span className="text-lg font-medium text-gray-600 ml-2">/month</span>
                </div>
                <p className="text-sm text-gray-500">Billed monthly</p>
              </div>
              
              <ul className="space-y-4 mb-8 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>1 active event</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Up to 50 sponsors</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>3 team members</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Basic dashboard & analytics</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Email reminders</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>CSV data exports</span>
                </li>
              </ul>
              
              <Button className="w-full btn-premium" variant="outline" asChild>
                <Link href="/auth/sign-up?plan=starter">
                  Start 14-Day Free Trial
                </Link>
              </Button>
            </div>
            
            {/* Growth Plan - Featured */}
            <div className="relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="px-4 py-1 bg-blue-600 text-white rounded-full text-sm font-medium shadow-lg">
                  <Star className="h-4 w-4 mr-1 inline fill-current" />
                  Most Popular
                </div>
              </div>
              <div className="premium-card p-8 rounded-lg border-2 border-blue-200 bg-white shadow-lg">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-black mb-2">Growth</h3>
                  <p className="text-gray-600 mb-6">Ideal for multi-event operations and growing teams</p>
                  <div className="flex items-baseline mb-2">
                    <span className="text-4xl font-bold text-blue-600">$499</span>
                    <span className="text-lg font-medium text-gray-600 ml-2">/month</span>
                  </div>
                  <p className="text-sm text-gray-500">Billed monthly</p>
                </div>
                
                <ul className="space-y-4 mb-8 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>5 active events</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Up to 200 sponsors</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>10 team members</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Advanced dashboard & risk analytics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Custom deliverable templates</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Professional PDF reports</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Priority email support</span>
                  </li>
                </ul>
                
                <Button className="w-full btn-premium bg-blue-600 hover:bg-blue-700 text-white" asChild>
                  <Link href="/auth/sign-up?plan=growth">
                    Start 14-Day Free Trial
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Enterprise Plan */}
            <div className="premium-card p-8 rounded-lg border border-gray-200 bg-white">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-black mb-2">Enterprise</h3>
                <p className="text-gray-600 mb-6">For large organizations with complex needs</p>
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl font-bold text-black">$999</span>
                  <span className="text-lg font-medium text-gray-600 ml-2">/month</span>
                </div>
                <p className="text-sm text-gray-500">Custom pricing available</p>
              </div>
              
              <ul className="space-y-4 mb-8 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Unlimited events</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Unlimited sponsors</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Unlimited team members</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>White-label branding options</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Full API access</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Dedicated success manager</span>
                </li>
              </ul>
              
              <Button className="w-full btn-premium" variant="outline" asChild>
                <Link href="/contact?plan=enterprise">
                  Contact Sales Team
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Trust indicators */}
          <div className="text-center mt-16 pt-12 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Trusted by event teams worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-2xl font-bold text-gray-400">EventCorp</div>
              <div className="text-2xl font-bold text-gray-400">MegaEvents</div>
              <div className="text-2xl font-bold text-gray-400">ProShow</div>
              <div className="text-2xl font-bold text-gray-400">EventPlus</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 sm:py-24 bg-black overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Protect Your
              <br className="hidden sm:block" />
              Sponsor Relationships?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join hundreds of event teams using SponsorAssure to ensure deliverable completion 
              and protect million-dollar sponsor renewals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
              <Button 
                size="lg" 
                className="btn-premium text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto" 
                asChild
              >
                <Link href="/auth/sign-up" className="flex items-center space-x-2">
                  <span>Start Free 14-Day Trial</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="btn-premium text-lg px-8 py-4 text-white border-gray-600 hover:bg-gray-800 w-full sm:w-auto"
              >
                <span className="flex items-center space-x-2">
                  <span>Schedule Live Demo</span>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </span>
              </Button>
            </div>
            
            {/* Social proof */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-gray-400 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Setup in under 10 minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center space-x-3 mb-6 group">
                <div className="p-2 bg-white rounded-lg transition-all group-hover:bg-gray-200">
                  <Shield className="h-6 w-6 text-black" />
                </div>
                <span className="text-xl font-bold">SponsorAssure</span>
              </Link>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-sm">
                Protecting sponsor relationships through intelligent deliverable assurance and risk management.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="w-5 h-5 bg-gray-400 rounded"></div>
                </Link>
                <Link href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="w-5 h-5 bg-gray-400 rounded"></div>
                </Link>
                <Link href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="w-5 h-5 bg-gray-400 rounded"></div>
                </Link>
              </div>
            </div>
            
            {/* Product */}
            <div>
              <h3 className="font-semibold text-white mb-6">Product</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/demo" className="hover:text-white transition-colors">Live Demo</Link></li>
                <li><Link href="/integrations" className="hover:text-white transition-colors">Integrations</Link></li>
                <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h3 className="font-semibold text-white mb-6">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
                <li><Link href="/status" className="hover:text-white transition-colors flex items-center">
                  System Status
                  <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
                </Link></li>
                <li><Link href="/api-docs" className="hover:text-white transition-colors">API Documentation</Link></li>
              </ul>
            </div>
            
            {/* Company */}
            <div>
              <h3 className="font-semibold text-white mb-6">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom section */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 sm:mb-0">
                &copy; 2025 SponsorAssure. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <span>Made with ❤️ for event professionals</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>All systems operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}