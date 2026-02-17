'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Shield, Calendar, FileText, BarChart3, ArrowRight, Star, Users, TrendingUp, Clock, AlertTriangle } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'

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

const slideInFromLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
}

const slideInFromRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
}

// Hook for detecting reduced motion preference
function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])
  
  return prefersReducedMotion
}

// Animated counter component with reduced motion support
function AnimatedCounter({ end, duration = 2000, suffix = '', prefix = '' }: { 
  end: number; 
  duration?: number; 
  suffix?: string; 
  prefix?: string; 
}) {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)
  const isInView = useInView(countRef, { once: true, threshold: 0.3 })
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!isInView) return

    // If user prefers reduced motion, show final value immediately
    if (prefersReducedMotion) {
      setCount(end)
      return
    }

    let startTime: number
    let animationFrame: number

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutExpo = 1 - Math.pow(2, -10 * progress)
      const currentCount = Math.floor(easeOutExpo * end)
      
      setCount(currentCount)
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount)
      } else {
        setCount(end)
      }
    }

    animationFrame = requestAnimationFrame(updateCount)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, isInView, prefersReducedMotion])

  return (
    <div ref={countRef} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-2 tracking-tight">
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  )
}

// Professional testimonial portrait component
function TestimonialPortrait({ 
  className, 
  alt, 
  imagePath
}: { 
  className?: string; 
  alt: string; 
  imagePath: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-full ${className || ''}`}>
      <img 
        src={imagePath} 
        alt={alt}
        className="w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Compact Header - Sunday style */}
      <motion.header 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="p-1.5 bg-black rounded-lg transition-all group-hover:bg-gray-800">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-black">
              SponsorAssure
            </span>
          </Link>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-black hidden sm:inline-flex" asChild>
              <Link href="/auth/sign-in">Sign In</Link>
            </Button>
            <Button size="sm" className="bg-black hover:bg-gray-800 text-white" asChild>
              <Link href="/auth/sign-up">Get Started</Link>
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Compact Hero Lead-in */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-4 leading-tight">
              Professional sponsor tracking
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Transform deliverable chaos into partnership certainty
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dominant Stats Section - Sunday inspired */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center">
              <AnimatedCounter end={850} suffix="+" duration={2000} />
              <div className="text-sm sm:text-base text-gray-600 font-medium">
                Events managed
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <AnimatedCounter end={24} prefix="$" suffix="M+" duration={2200} />
              <div className="text-sm sm:text-base text-gray-600 font-medium">
                Sponsor value protected
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <AnimatedCounter end={99} suffix="%" duration={2400} />
              <div className="text-sm sm:text-base text-gray-600 font-medium">
                Deliverables completed on time
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <AnimatedCounter end={47000} suffix="+" duration={2600} />
              <div className="text-sm sm:text-base text-gray-600 font-medium">
                Sponsor touchpoints managed
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Early Social Proof Strip */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black mb-8 italic">
              "We've had more sponsor renewals this quarter than in the previous two years combined."
            </blockquote>
            <div className="flex items-center justify-center space-x-3">
              <TestimonialPortrait 
                className="w-12 h-12" 
                alt="Sarah Kim"
                imagePath="/images/testimonials/sarah-chen.jpg"
              />
              <div className="text-left">
                <p className="font-medium text-gray-900">Sarah Kim, Summit Events</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quote/Proof Section */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black mb-8 italic">
              "When we implemented SponsorAssure across 15 events, sponsor satisfaction scores increased 
              <span className="text-blue-600"> 35% consistently</span>."
            </blockquote>
            <div className="flex items-center justify-center space-x-3">
              <TestimonialPortrait 
                className="w-12 h-12" 
                alt="Marcus Rodriguez"
                imagePath="/images/testimonials/marcus-rodriguez.jpg"
              />
              <div className="text-left">
                <p className="font-medium text-gray-900">Marcus Rodriguez, Director of Partnerships, Summit Series</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black mb-8 italic">
              "Sponsors expect premium execution — no room for missed deliverables."
            </blockquote>
            <div className="flex items-center justify-center space-x-3">
              <TestimonialPortrait 
                className="w-12 h-12" 
                alt="David Park"
                imagePath="/images/testimonials/david-park.jpg"
              />
              <div className="text-left">
                <p className="font-medium text-gray-900">David Park, Event Operations, Global Tech Conference</p>
              </div>
            </div>
          </motion.div>

          {/* Feature Grid */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-left group">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-blue-200">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Precision alerts</h3>
              <p className="text-gray-600">Intelligent deadline management with executive-level timing controls.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-left group">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-blue-200">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Executive dashboard</h3>
              <p className="text-gray-600">Real-time portfolio visibility across all events and partnerships.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-left group">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-blue-200">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Team coordination</h3>
              <p className="text-gray-600">Crystal-clear accountability with intelligent workflow automation.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-left group">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-blue-200">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Tier frameworks</h3>
              <p className="text-gray-600">Enterprise-calibrated sponsorship structures from basic to flagship tier.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-left group">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-blue-200">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Documentation</h3>
              <p className="text-gray-600">Comprehensive evidence systems with timestamped verification.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-left group">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-blue-200">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Strategic reports</h3>
              <p className="text-gray-600">Executive-grade portfolios designed for C-level presentations.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mid-page Testimonial */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black mb-8 italic">
              "Large-scale events demand precision systems — our teams now focus on creativity, not compliance."
            </blockquote>
            <div className="flex items-center justify-center space-x-3">
              <TestimonialPortrait 
                className="w-12 h-12" 
                alt="Lisa Chang"
                imagePath="/images/testimonials/lisa-chang.jpg"
              />
              <div className="text-left">
                <p className="font-medium text-gray-900">Lisa Chang, Sponsor Relations Manager, Industry Connect</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Large Feature Callout - Sunday style */}
      <section className="py-24 sm:py-32 bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              "There's an art to event management, 
              <br />
              but no art to 
              <span className="text-blue-400"> tracking deliverables</span>."
            </h2>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8">
              — Jennifer Walsh, VP Events, Innovation Summit
            </p>
          </motion.div>
        </div>
      </section>

      {/* Alternating Quote/Proof */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black mb-8 italic">
              "Enterprise sponsors can coordinate how they want — <span className="text-green-600">teams focus on execution</span>."
            </blockquote>
            <div className="flex items-center justify-center space-x-3">
              <TestimonialPortrait 
                className="w-12 h-12" 
                alt="Jennifer Walsh"
                imagePath="/images/testimonials/jennifer-walsh.jpg"
              />
              <div className="text-left">
                <p className="font-medium text-gray-900">Jennifer Walsh, VP Events, Innovation Summit</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Another Quote */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black mb-8 italic">
              "Completion rates went from <span className="text-red-600">78%</span> to <span className="text-green-600">99%</span> on average."
            </blockquote>
            <div className="flex items-center justify-center space-x-3">
              <TestimonialPortrait 
                className="w-12 h-12" 
                alt="Michael Torres"
                imagePath="/images/testimonials/david-park.jpg"
              />
              <div className="text-left">
                <p className="font-medium text-gray-900">Michael Torres, Owner, Meridian Events</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Concise Mid-Page CTA Block */}
      <section className="py-24 sm:py-32 bg-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Professional execution.
              <br />
              Lasting partnerships.
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Transform sponsor uncertainty into strategic advantage
            </p>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                asChild
              >
                <Link href="/auth/sign-up" className="flex items-center space-x-2">
                  <span>Start professional tracking</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final Simple Stats - Sunday style */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp}>
              <div className="text-4xl sm:text-5xl font-bold text-black mb-2">24/7</div>
              <div className="text-gray-600">Support ready for you</div>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <div className="text-4xl sm:text-5xl font-bold text-black mb-2">
                <AnimatedCounter end={7} duration={1500} />
                <span> days</span>
              </div>
              <div className="text-gray-600">To receive setup and be ready</div>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <div className="text-4xl sm:text-5xl font-bold text-black mb-2">100%</div>
              <div className="text-gray-600">Deliverable coverage</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Minimal Footer - Sunday inspired */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="p-1.5 bg-white rounded-lg">
                  <Shield className="h-4 w-4 text-black" />
                </div>
                <span className="font-bold">SponsorAssure</span>
              </Link>
            </div>
            
            {/* Links */}
            <div>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/features" className="hover:text-white">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/demo" className="hover:text-white">Demo</Link></li>
              </ul>
            </div>
            
            <div>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/help" className="hover:text-white">Help</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/api" className="hover:text-white">API</Link></li>
              </ul>
            </div>
            
            <div>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom */}
          <div className="border-t border-gray-800 pt-6">
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
              <p>&copy; 2025 SponsorAssure. All rights reserved.</p>
              <div className="flex items-center space-x-2 mt-2 sm:mt-0">
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