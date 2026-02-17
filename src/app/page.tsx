'use client'

import Link from 'next/link'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Shield, Calendar, FileText, BarChart3, ArrowRight, Star, Users, TrendingUp, Clock, AlertTriangle, Globe, Zap, Award, Target, ChevronRight, Play, ExternalLink } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
}

const fadeInScale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
}

const slideInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 1, ease: [0.4, 0, 0.2, 1] }
}

const slideInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 1, ease: [0.4, 0, 0.2, 1] }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
}

const heroStagger = {
  animate: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
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

// Enhanced animated counter with magnetic hover effect
function AnimatedCounter({ 
  end, 
  duration = 2000, 
  suffix = '', 
  prefix = '',
  className = ''
}: { 
  end: number; 
  duration?: number; 
  suffix?: string; 
  prefix?: string; 
  className?: string;
}) {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)
  const isInView = useInView(countRef, { once: true, threshold: 0.3 })
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!isInView) return

    if (prefersReducedMotion) {
      setCount(end)
      return
    }

    let startTime: number
    let animationFrame: number

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
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
    <motion.div 
      ref={countRef} 
      className={`font-bold tracking-tight ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.div>
  )
}

// Premium testimonial with enhanced styling
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
    <motion.div 
      className={`relative overflow-hidden rounded-full ring-2 ring-white/20 ${className || ''}`}
      whileHover={{ scale: 1.1, rotate: 2 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <img 
        src={imagePath} 
        alt={alt}
        className="w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </motion.div>
  )
}

// Removed MagneticButton component - using standard Button instead

// Removed TrustLogo component - inline simplified version used instead

export default function HomePage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div className="min-h-screen bg-white">
      {/* Clean Header */}
      <header className="fixed top-0 w-full z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <div className="p-2 bg-black rounded-lg">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-black">
              SponsorAssure
            </span>
          </Link>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-black hidden sm:inline-flex" asChild>
              <Link href="/auth/sign-in">Sign In</Link>
            </Button>
            <Button size="sm" className="bg-black hover:bg-gray-800 text-white" asChild>
              <Link href="/auth/sign-up">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* HERO SECTION - Minimal clean design */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 to-black">
        {/* Subtle background accent */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
        </div>

        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        >
          <motion.div
            variants={heroStagger}
            initial="initial"
            animate="animate"
            className="max-w-4xl mx-auto"
          >
            {/* Pre-headline badge - simplified */}
            <motion.div variants={fadeInUp} className="mb-6">
              <Badge className="bg-white/10 text-white border-white/20 px-4 py-1 text-sm font-normal">
                Trusted by 1,200+ event professionals
              </Badge>
            </motion.div>

            {/* Hero headline - reduced scale */}
            <motion.h1 
              variants={fadeInScale}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight"
            >
              Professional sponsor
              <br />
              <span className="text-blue-400">
                execution
              </span>
            </motion.h1>

            {/* Subtitle - reduced scale */}
            <motion.p 
              variants={fadeInUp}
              className="text-lg sm:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Transform deliverable chaos into partnership certainty.
              <br className="hidden sm:block" />
              Enterprise-grade tracking that scales.
            </motion.p>

            {/* CTA buttons - simplified */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-medium"
                asChild
              >
                <Link href="/auth/sign-up" className="flex items-center space-x-2">
                  <span>Start tracking</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button 
                variant="outline"
                size="lg" 
                className="border-white/30 text-white hover:bg-white/10 px-6 py-3 font-medium"
                asChild
              >
                <Link href="#demo" className="flex items-center space-x-2">
                  <Play className="h-4 w-4" />
                  <span>Watch demo</span>
                </Link>
              </Button>
            </motion.div>

            {/* Trust logos row */}
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
            >
              <div className="flex items-center justify-center opacity-60">
                <div className="px-3 py-2 bg-white/10 rounded-md border border-white/20">
                  <span className="text-sm text-white/80">Global Events Co.</span>
                </div>
              </div>
              <div className="flex items-center justify-center opacity-60">
                <div className="px-3 py-2 bg-white/10 rounded-md border border-white/20">
                  <span className="text-sm text-white/80">Summit Series</span>
                </div>
              </div>
              <div className="flex items-center justify-center opacity-60">
                <div className="px-3 py-2 bg-white/10 rounded-md border border-white/20">
                  <span className="text-sm text-white/80">Industry Connect</span>
                </div>
              </div>
              <div className="flex items-center justify-center opacity-60">
                <div className="px-3 py-2 bg-white/10 rounded-md border border-white/20">
                  <span className="text-sm text-white/80">Innovation Forum</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, threshold: 0.3 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInScale} className="text-center">
              <div className="mb-3">
                <AnimatedCounter 
                  end={1247} 
                  suffix="+" 
                  duration={2000} 
                  className="text-3xl sm:text-4xl lg:text-5xl text-black mb-2"
                />
                <div className="text-sm text-gray-600">
                  Events powered
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInScale} className="text-center">
              <div className="mb-3">
                <AnimatedCounter 
                  end={47} 
                  prefix="$" 
                  suffix="M+" 
                  duration={2200} 
                  className="text-3xl sm:text-4xl lg:text-5xl text-black mb-2"
                />
                <div className="text-sm text-gray-600">
                  Sponsor value protected
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInScale} className="text-center">
              <div className="mb-3">
                <AnimatedCounter 
                  end={99.2} 
                  suffix="%" 
                  duration={2400} 
                  className="text-3xl sm:text-4xl lg:text-5xl text-black mb-2"
                />
                <div className="text-sm text-gray-600">
                  On-time completion rate
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInScale} className="text-center">
              <div className="mb-3">
                <AnimatedCounter 
                  end={127000} 
                  suffix="+" 
                  duration={2600} 
                  className="text-3xl sm:text-4xl lg:text-5xl text-black mb-2"
                />
                <div className="text-sm text-gray-600">
                  Touchpoints managed
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIAL - Clean minimal */}
      <section className="py-20 sm:py-24 bg-gray-900 text-white relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-blue-500 rounded-full blur-2xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-8 leading-relaxed">
                "We went from 78% completion to 99.2% overnight.
                <br className="hidden sm:block" />
                This platform transformed our reputation."
              </blockquote>
            </motion.div>
            
            <motion.div 
              className="flex items-center justify-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <TestimonialPortrait 
                className="w-16 h-16" 
                alt="Sarah Kim"
                imagePath="/images/testimonials/sarah-chen.jpg"
              />
              <div className="text-left">
                <p className="font-semibold text-xl text-white">Sarah Kim</p>
                <p className="text-gray-300">Summit Events, VP Operations</p>
              </div>
              <div className="hidden sm:flex items-center space-x-1 ml-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 leading-tight">
              Enterprise-grade precision
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              The professional system your reputation demands
            </p>
          </motion.div>

          {/* Features grid with depth */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {[
              {
                icon: Clock,
                title: "Precision alerts",
                description: "Intelligent deadline management with executive-level timing controls and predictive risk assessment.",
                gradient: "from-blue-500 to-blue-600",
                bgGradient: "from-blue-50 to-blue-100"
              },
              {
                icon: BarChart3,
                title: "Executive dashboard",
                description: "Real-time portfolio visibility across all events and partnerships with strategic insights.",
                gradient: "from-purple-500 to-purple-600",
                bgGradient: "from-purple-50 to-purple-100"
              },
              {
                icon: Users,
                title: "Team coordination",
                description: "Crystal-clear accountability with intelligent workflow automation and role-based permissions.",
                gradient: "from-green-500 to-green-600",
                bgGradient: "from-green-50 to-green-100"
              },
              {
                icon: FileText,
                title: "Tier frameworks",
                description: "Enterprise-calibrated sponsorship structures from basic to flagship tier with custom templates.",
                gradient: "from-orange-500 to-orange-600",
                bgGradient: "from-orange-50 to-orange-100"
              },
              {
                icon: CheckCircle,
                title: "Documentation",
                description: "Comprehensive evidence systems with timestamped verification and automated compliance reporting.",
                gradient: "from-teal-500 to-teal-600",
                bgGradient: "from-teal-50 to-teal-100"
              },
              {
                icon: Shield,
                title: "Strategic reports",
                description: "Executive-grade portfolios designed for C-level presentations with custom branding options.",
                gradient: "from-red-500 to-red-600",
                bgGradient: "from-red-50 to-red-100"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                variants={fadeInScale}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <div className="p-6 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center mb-4`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-black mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="flex items-center mt-4 text-gray-500 text-sm">
                    <span>Learn more</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* QUOTE CALLOUT */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <blockquote className="text-2xl sm:text-3xl font-semibold text-black mb-6 leading-relaxed">
                "Large-scale events demand precision systems — 
                our teams now focus on creativity, not compliance."
              </blockquote>
            </motion.div>
            
            <div className="flex items-center justify-center space-x-4">
              <TestimonialPortrait 
                className="w-14 h-14" 
                alt="Lisa Chang"
                imagePath="/images/testimonials/lisa-chang.jpg"
              />
              <div className="text-left">
                <p className="font-semibold text-xl text-black">Lisa Chang</p>
                <p className="text-gray-600">Sponsor Relations Manager, Industry Connect</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MID-PAGE CTA - Minimal */}
      <section className="py-20 sm:py-24 bg-gray-900 text-white relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Professional execution.
              <br />
              Lasting partnerships.
            </h2>
            
            <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto text-gray-300 leading-relaxed">
              Transform sponsor uncertainty into strategic advantage with enterprise-grade tracking
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-medium"
                asChild
              >
                <Link href="/auth/sign-up" className="flex items-center space-x-2">
                  <span>Start tracking</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button 
                variant="outline"
                size="lg" 
                className="border-white/30 text-white hover:bg-white/10 px-6 py-3 font-medium"
                asChild
              >
                <Link href="#demo" className="flex items-center space-x-2">
                  <ExternalLink className="h-4 w-4" />
                  <span>Schedule demo</span>
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FINAL STATS */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-5xl mx-auto text-center"
          >
            <motion.div variants={fadeInScale}>
              <div className="text-3xl sm:text-4xl font-bold text-black mb-2">24/7</div>
              <div className="text-gray-600">Enterprise support ready</div>
            </motion.div>
            
            <motion.div variants={fadeInScale}>
              <div className="text-3xl sm:text-4xl font-bold text-black mb-2 flex items-center justify-center">
                <AnimatedCounter end={3} duration={1500} />
                <span className="ml-1">days</span>
              </div>
              <div className="text-gray-600">Full setup and training</div>
            </motion.div>
            
            <motion.div variants={fadeInScale}>
              <div className="text-3xl sm:text-4xl font-bold text-black mb-2">100%</div>
              <div className="text-gray-600">Deliverable coverage</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ENHANCED FOOTER */}
      <footer className="bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-white to-gray-200 rounded-xl shadow-lg">
                  <Shield className="h-6 w-6 text-black" />
                </div>
                <span className="text-xl font-bold">SponsorAssure</span>
              </Link>
              <p className="text-gray-400 leading-relaxed">
                Enterprise-grade sponsor tracking that transforms partnerships.
              </p>
            </div>
            
            {/* Product */}
            <div>
              <h3 className="font-semibold mb-4 text-white">Product</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/demo" className="hover:text-white transition-colors">Demo</Link></li>
                <li><Link href="/integrations" className="hover:text-white transition-colors">Integrations</Link></li>
              </ul>
            </div>
            
            {/* Company */}
            <div>
              <h3 className="font-semibold mb-4 text-white">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/press" className="hover:text-white transition-colors">Press</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h3 className="font-semibold mb-4 text-white">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/api" className="hover:text-white transition-colors">API Docs</Link></li>
                <li><Link href="/status" className="hover:text-white transition-colors">System Status</Link></li>
                <li><Link href="/community" className="hover:text-white transition-colors">Community</Link></li>
              </ul>
            </div>
            
            {/* Legal */}
            <div>
              <h3 className="font-semibold mb-4 text-white">Legal</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
                <li><Link href="/compliance" className="hover:text-white transition-colors">Compliance</Link></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom section */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-gray-400">&copy; 2025 SponsorAssure. All rights reserved.</p>
              <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                <motion.div 
                  className="w-3 h-3 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-gray-400 text-sm">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}