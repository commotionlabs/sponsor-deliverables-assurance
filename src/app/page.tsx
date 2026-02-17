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
    <div ref={countRef} className="text-6xl sm:text-7xl lg:text-8xl font-bold text-black mb-4 tracking-tight">
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
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button className="btn-premium bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200" asChild>
                <Link href="/auth/sign-up" className="flex items-center space-x-2">
                  <span>Get Started</span>
                  <motion.div
                    initial={{ x: 0 }}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Hero Stats Section - Sunday App inspired with enhanced spacing */}
      <section className="relative py-32 sm:py-40 lg:py-52 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="max-w-7xl mx-auto"
          >
            {/* Hero Title with better typography */}
            <motion.div variants={fadeInUp} className="text-center mb-24 lg:mb-32">
              <motion.h1 
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-black mb-8 leading-[0.9] tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Every sponsor deliverable.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Tracked. Delivered. Assured.
                </span>
              </motion.h1>
              <motion.p 
                className="text-xl sm:text-2xl lg:text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Precision tracking that transforms sponsor relationships from risk into revenue certainty.
              </motion.p>
            </motion.div>

            {/* Key Metrics Grid - Sunday App style with animations */}
            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-20 mb-24"
            >
              <motion.div variants={fadeInUp} className="text-center">
                <AnimatedCounter end={500} suffix="+" duration={2000} />
                <div className="text-lg sm:text-xl text-gray-600 leading-tight">
                  Event teams
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="text-center">
                <AnimatedCounter end={98} suffix="%" duration={2200} />
                <div className="text-lg sm:text-xl text-gray-600 leading-tight">
                  Completion rate
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="text-center">
                <AnimatedCounter end={2} prefix="$" suffix="M+" duration={2400} />
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

            {/* CTA with enhanced interaction */}
            <motion.div variants={fadeInUp} className="text-center">
              <motion.div 
                whileHover={{ scale: 1.05, y: -3 }} 
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="inline-block"
              >
                <Button 
                  size="lg" 
                  className="btn-premium text-xl px-12 py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-blue-500 hover:border-blue-600" 
                  asChild
                >
                  <Link href="/auth/sign-up" className="flex items-center space-x-3">
                    <span>Begin professional tracking</span>
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="h-6 w-6" />
                    </motion.div>
                  </Link>
                </Button>
              </motion.div>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="text-sm text-gray-500 mt-4"
              >
                Enterprise trial • No commitment required
              </motion.p>
            </motion.div>

            {/* Visual separator - Sunday style */}
            <motion.div 
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-16 rounded-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Client Quote Section - Sunday App inspired */}
      <section className="relative py-28 sm:py-36 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-10 leading-tight italic">
                "Exceptional execution demands exceptional tracking. SponsorAssure delivers both."
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="flex items-center justify-center space-x-4"
            >
              <TestimonialPortrait 
                className="w-16 h-16" 
                alt="Sarah Chen, Events Director"
                imagePath="/images/testimonials/sarah-chen.jpg"
              />
              <div className="text-left">
                <p className="text-xl font-medium text-gray-900">Sarah Chen</p>
                <p className="text-lg text-gray-600">Events Director, TechConf Global</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="relative py-28 sm:py-36 bg-white">
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
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-8 leading-tight">
              Every missed deliverable
              <br />
              <span className="text-red-600">erodes trust permanently</span>
            </h2>
            <p className="text-xl text-gray-600">
              Premium sponsors expect flawless execution. Manual processes create liability. 
              Professional tracking builds lasting partnerships.
            </p>
          </motion.div>

          {/* Cost Breakdown with animated counters */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center p-8">
              <div className="text-4xl font-bold text-red-600 mb-4">
                <AnimatedCounter end={73} suffix="%" duration={1800} />
              </div>
              <div className="text-lg font-medium text-black mb-2">of sponsors</div>
              <div className="text-gray-600">won't renew after missed deliverables</div>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="text-center p-8">
              <div className="text-4xl font-bold text-red-600 mb-4">
                <AnimatedCounter end={85} prefix="$" suffix="K" duration={2000} />
              </div>
              <div className="text-lg font-medium text-black mb-2">average</div>
              <div className="text-gray-600">sponsor relationship value lost</div>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="text-center p-8">
              <div className="text-4xl font-bold text-red-600 mb-4">
                <AnimatedCounter end={47} suffix="%" duration={1600} />
              </div>
              <div className="text-lg font-medium text-black mb-2">of teams</div>
              <div className="text-gray-600">use error-prone spreadsheets</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Solution Quote */}
      <section className="relative py-24 sm:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-10 leading-tight italic">
                "From operational chaos to partnership excellence. SponsorAssure transformed our 
                <span className="text-green-600">renewal rate to 95%</span>."
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="flex items-center justify-center space-x-4"
            >
              <TestimonialPortrait 
                className="w-16 h-16" 
                alt="Marcus Rodriguez, Director of Partnerships"
                imagePath="/images/testimonials/marcus-rodriguez.jpg"
              />
              <div className="text-left">
                <p className="text-xl font-medium text-gray-900">Marcus Rodriguez</p>
                <p className="text-lg text-gray-600">Director of Partnerships, Summit Series</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Key Features Grid - Clean Sunday style */}
      <section className="relative py-24 sm:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-8 leading-tight">
              Enterprise-grade assurance for
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                high-value partnerships
              </span>
            </h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center group">
              <motion.div 
                className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:bg-blue-100 group-hover:scale-110"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Clock className="h-10 w-10 text-blue-600 transition-all duration-300 group-hover:scale-110" />
              </motion.div>
              <h3 className="text-2xl font-bold text-black mb-4 group-hover:text-blue-600 transition-colors duration-300">
                Precision alerts
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Intelligent deadline management with executive-level timing controls for every deliverable tier.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center group">
              <motion.div 
                className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:bg-blue-100 group-hover:scale-110"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <BarChart3 className="h-10 w-10 text-blue-600 transition-all duration-300 group-hover:scale-110" />
              </motion.div>
              <h3 className="text-2xl font-bold text-black mb-4 group-hover:text-blue-600 transition-colors duration-300">
                Executive oversight
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Strategic command center with real-time portfolio visibility across all events and partnerships.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center group">
              <motion.div 
                className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:bg-blue-100 group-hover:scale-110"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Users className="h-10 w-10 text-blue-600 transition-all duration-300 group-hover:scale-110" />
              </motion.div>
              <h3 className="text-2xl font-bold text-black mb-4 group-hover:text-blue-600 transition-colors duration-300">
                Seamless delegation
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Crystal-clear accountability chains with intelligent workflow automation and escalation protocols.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center group">
              <motion.div 
                className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:bg-blue-100 group-hover:scale-110"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <FileText className="h-10 w-10 text-blue-600 transition-all duration-300 group-hover:scale-110" />
              </motion.div>
              <h3 className="text-2xl font-bold text-black mb-4 group-hover:text-blue-600 transition-colors duration-300">
                Tier-based frameworks
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Enterprise-calibrated sponsorship structures from foundational to flagship tier execution standards.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center group">
              <motion.div 
                className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:bg-blue-100 group-hover:scale-110"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <CheckCircle className="h-10 w-10 text-blue-600 transition-all duration-300 group-hover:scale-110" />
              </motion.div>
              <h3 className="text-2xl font-bold text-black mb-4 group-hover:text-blue-600 transition-colors duration-300">
                Forensic documentation
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Comprehensive evidence systems with timestamped verification and audit-ready fulfillment records.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center group">
              <motion.div 
                className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:bg-blue-100 group-hover:scale-110"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Shield className="h-10 w-10 text-blue-600 transition-all duration-300 group-hover:scale-110" />
              </motion.div>
              <h3 className="text-2xl font-bold text-black mb-4 group-hover:text-blue-600 transition-colors duration-300">
                Strategic reporting
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Executive-grade deliverable portfolios designed for C-level sponsor renewal presentations.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* More Client Quotes - Sunday App pattern */}
      <section className="relative py-24 sm:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-20 max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 italic">
                "Professional-grade tracking elevated our sponsor relationships. Renewals increased <span className="text-green-600">40%</span> immediately."
              </h2>
              <div className="flex items-center justify-center space-x-4">
                <TestimonialPortrait 
                  className="w-14 h-14" 
                  alt="Jennifer Walsh, VP Events"
                  imagePath="/images/testimonials/jennifer-walsh.jpg"
                />
                <div className="text-left">
                  <p className="text-lg font-medium text-gray-900">Jennifer Walsh</p>
                  <p className="text-gray-600">VP Events, Innovation Summit</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 italic">
                "Large-scale events demand precision systems. Our teams now focus on creativity, not compliance."
              </h2>
              <div className="flex items-center justify-center space-x-4">
                <TestimonialPortrait 
                  className="w-14 h-14" 
                  alt="David Park, Event Operations"
                  imagePath="/images/testimonials/david-park.jpg"
                />
                <div className="text-left">
                  <p className="text-lg font-medium text-gray-900">David Park</p>
                  <p className="text-gray-600">Event Operations, Global Tech Conference</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 italic">
                "Flawless execution builds lasting partnerships. <span className="text-blue-600">99% completion rate</span> speaks for itself."
              </h2>
              <div className="flex items-center justify-center space-x-4">
                <TestimonialPortrait 
                  className="w-14 h-14" 
                  alt="Lisa Chang, Sponsor Relations Manager"
                  imagePath="/images/testimonials/lisa-chang.jpg"
                />
                <div className="text-left">
                  <p className="text-lg font-medium text-gray-900">Lisa Chang</p>
                  <p className="text-gray-600">Sponsor Relations Manager, Industry Connect</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Getting Started - Simple like Sunday */}
      <section className="relative py-24 sm:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-8 leading-tight">
              Professional execution.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                Lifetime partnerships.
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform operational uncertainty into strategic advantage. When execution meets expectation, 
              sponsors become partners—and partnerships become growth engines.
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
              <div className="text-5xl font-bold text-black mb-4">
                <AnimatedCounter end={7} duration={1500} />
              </div>
              <div className="text-lg font-medium text-black mb-2">Days</div>
              <div className="text-gray-600">To full setup and first deliverables tracked</div>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-5xl font-bold text-black mb-4">24/7</div>
              <div className="text-lg font-medium text-black mb-2">Support</div>
              <div className="text-gray-600">Ready when you need help or have questions</div>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-5xl font-bold text-black mb-4">
                <AnimatedCounter end={100} suffix="%" duration={2000} />
              </div>
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
            <motion.div 
              whileHover={{ scale: 1.05, y: -3 }} 
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="inline-block"
            >
              <Button 
                size="lg" 
                className="btn-premium text-xl px-12 py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-blue-500 hover:border-blue-600" 
                asChild
              >
                <Link href="/auth/sign-up" className="flex items-center space-x-3">
                  <span>Elevate sponsor relations</span>
                  <motion.div
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="h-6 w-6" />
                  </motion.div>
                </Link>
              </Button>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="text-sm text-gray-500 mt-6"
            >
              Professional trial • Executive setup • White-glove onboarding
            </motion.p>
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