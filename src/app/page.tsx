'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Shield, Calendar, FileText, BarChart3, ArrowRight, Star, Users, TrendingUp, Clock, AlertTriangle } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm"
      >
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
        </div>
      </motion.header>

      {/* Hero Stats Section - Sunday App inspired */}
      <section className="relative py-24 sm:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="max-w-6xl mx-auto"
          >
            {/* Hero Title */}
            <motion.div variants={fadeInUp} className="text-center mb-20">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-black mb-6 leading-tight tracking-tight">
                Never miss another
                <br />
                sponsor deliverable.
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                The smart way to track deliverables in events
              </p>
            </motion.div>

            {/* Key Metrics Grid - Sunday App style */}
            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20"
            >
              <motion.div variants={fadeInUp} className="text-center">
                <div className="text-6xl sm:text-7xl lg:text-8xl font-bold text-black mb-4 tracking-tight">
                  500+
                </div>
                <div className="text-lg sm:text-xl text-gray-600 leading-tight">
                  Event teams
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="text-center">
                <div className="text-6xl sm:text-7xl lg:text-8xl font-bold text-black mb-4 tracking-tight">
                  98%
                </div>
                <div className="text-lg sm:text-xl text-gray-600 leading-tight">
                  Completion rate
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="text-center">
                <div className="text-6xl sm:text-7xl lg:text-8xl font-bold text-black mb-4 tracking-tight">
                  $2M+
                </div>
                <div className="text-lg sm:text-xl text-gray-600 leading-tight">
                  Revenue protected
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="text-center">
                <div className="text-6xl sm:text-7xl lg:text-8xl font-bold text-black mb-4 tracking-tight">
                  24/7
                </div>
                <div className="text-lg sm:text-xl text-gray-600 leading-tight">
                  Monitoring
                </div>
              </motion.div>
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeInUp} className="text-center">
              <Button 
                size="lg" 
                className="btn-premium text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white" 
                asChild
              >
                <Link href="/auth/sign-up" className="flex items-center space-x-2">
                  <span>Start free trial</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Client Quote Section - Sunday App inspired */}
      <section className="relative py-20 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-8 leading-tight">
              "There's an art to sponsorship, but no art to missing deliverables."
            </h2>
            <p className="text-xl text-gray-600">
              — Sarah Chen, Events Director, TechConf Global
            </p>
          </motion.div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="relative py-20 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-full text-sm font-medium text-red-700 mb-8">
              <AlertTriangle className="h-4 w-4 mr-2" />
              The real cost of missed deliverables
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-8 leading-tight">
              One missed deliverable costs
              <br />
              $50K in lost renewals
            </h2>
            <p className="text-xl text-gray-600">
              Event teams lose sponsor relationships every day. Manual tracking fails. 
              Deadlines slip. Renewals disappear.
            </p>
          </motion.div>

          {/* Cost Breakdown */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center p-8">
              <div className="text-4xl font-bold text-red-600 mb-4">73%</div>
              <div className="text-lg font-medium text-black mb-2">of sponsors</div>
              <div className="text-gray-600">won't renew after missed deliverables</div>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="text-center p-8">
              <div className="text-4xl font-bold text-red-600 mb-4">$85K</div>
              <div className="text-lg font-medium text-black mb-2">average</div>
              <div className="text-gray-600">sponsor relationship value lost</div>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="text-center p-8">
              <div className="text-4xl font-bold text-red-600 mb-4">47%</div>
              <div className="text-lg font-medium text-black mb-2">of teams</div>
              <div className="text-gray-600">use error-prone spreadsheets</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Solution Quote */}
      <section className="relative py-20 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-8 leading-tight">
              "SponsorAssure eliminated our delivery stress. Renewals went from 60% to 95%."
            </h2>
            <p className="text-xl text-gray-600">
              — Marcus Rodriguez, Director of Partnerships, Summit Series
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Features Grid - Clean Sunday style */}
      <section className="relative py-20 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-8 leading-tight">
              Everything you need to protect
              <br />
              sponsor relationships
            </h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Smart reminders</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Intelligent alerts before deadlines with customizable timing for every deliverable type.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Risk dashboard</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Real-time visibility into overdue, at-risk, and upcoming deliverables across all events.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Team assignment</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Clear ownership and accountability for every deliverable with automated notifications.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Package templates</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Pre-built sponsor tier templates that ensure nothing gets missed from Bronze to Platinum.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Proof tracking</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Evidence collection with photos, timestamps, and detailed fulfillment reports.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Export reports</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Professional branded reports perfect for sponsor relations and renewal discussions.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* More Client Quotes - Sunday App pattern */}
      <section className="relative py-20 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-16 max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
                "Sponsor renewals increased 40% after implementing SponsorAssure."
              </h2>
              <p className="text-xl text-gray-600">
                — Jennifer Walsh, VP Events, Innovation Summit
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
                "Large events run smoother — teams focus on execution, not tracking."
              </h2>
              <p className="text-xl text-gray-600">
                — David Park, Event Operations, Global Tech Conference
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
                "Delivery completion went from 85% to 99% in three months."
              </h2>
              <p className="text-xl text-gray-600">
                — Lisa Chang, Sponsor Relations Manager, Industry Connect
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Getting Started - Simple like Sunday */}
      <section className="relative py-20 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-8 leading-tight">
              From first setup to forever protected.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              With SponsorAssure, every deliverable becomes the start of stronger relationships. 
              Teams deliver, sponsors renew, creating a circle of growth and trust.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto mb-16"
          >
            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-5xl font-bold text-black mb-4">7</div>
              <div className="text-lg font-medium text-black mb-2">Days</div>
              <div className="text-gray-600">To full setup and first deliverables tracked</div>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-5xl font-bold text-black mb-4">24/7</div>
              <div className="text-lg font-medium text-black mb-2">Support</div>
              <div className="text-gray-600">Ready when you need help or have questions</div>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-5xl font-bold text-black mb-4">100%</div>
              <div className="text-lg font-medium text-black mb-2">Coverage</div>
              <div className="text-gray-600">Every deliverable tracked and protected</div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <Button 
              size="lg" 
              className="btn-premium text-xl px-12 py-6 bg-blue-600 hover:bg-blue-700 text-white" 
              asChild
            >
              <Link href="/auth/sign-up" className="flex items-center space-x-2">
                <span>Start protecting sponsors</span>
                <ArrowRight className="h-6 w-6" />
              </Link>
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              14-day free trial • No credit card required • Setup in minutes
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer - Minimal like Sunday */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center space-x-3 mb-6 group">
                <div className="p-2 bg-white rounded-lg transition-all group-hover:bg-gray-200">
                  <Shield className="h-6 w-6 text-black" />
                </div>
                <span className="text-xl font-bold">SponsorAssure</span>
              </Link>
              <p className="text-gray-400 leading-relaxed max-w-sm">
                Protecting sponsor relationships through intelligent deliverable assurance.
              </p>
            </div>
            
            {/* Product */}
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/demo" className="hover:text-white transition-colors">Demo</Link></li>
                <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/api" className="hover:text-white transition-colors">API Docs</Link></li>
              </ul>
            </div>
            
            {/* Company */}
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 sm:mb-0">
                &copy; 2025 SponsorAssure. All rights reserved.
              </p>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}