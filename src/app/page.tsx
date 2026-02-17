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
            <Button size="sm" className="bg-black hover:bg-gray-800 text-white rounded-md" asChild>
              <Link href="/auth/sign-up">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* HERO SECTION - Clean white minimal design */}
      <section ref={heroRef} className="relative min-h-[82vh] flex items-center justify-center overflow-hidden bg-white">
        {/* Removed background accents for clean white canvas */}

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        >
          <motion.div
            variants={heroStagger}
            initial="initial"
            animate="animate"
            className="max-w-3xl mx-auto"
          >
            {/* Pre-headline badge - refined */}
            <motion.div variants={fadeInUp} className="mb-3">
              <Badge className="bg-gray-100 text-gray-700 border-gray-200 px-3 py-1 text-xs font-medium">
                Used by 1,200+ events • 99.2% completion rate • $47M+ sponsor value secured
              </Badge>
            </motion.div>

            {/* Hero headline - sharpened for maximum clarity */}
            <motion.h1
              variants={fadeInScale}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-black mb-3 leading-[1.1] tracking-tight"
            >
              Never miss another
              <br />
              <span className="text-blue-600">
                sponsor deliverable
              </span>
            </motion.h1>

            {/* Subtitle - clearer value proposition */}
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-gray-600 mb-5 max-w-2xl mx-auto leading-[1.4]"
            >
              Stop losing sponsors to missed deadlines. Track every commitment,
              <br className="hidden sm:block" />
              hit 99%+ completion rates, protect your reputation.
            </motion.p>

            {/* CTA buttons - refined spacing */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-7"
            >
              <Button
                size="default"
                className="bg-black hover:bg-gray-800 text-white px-6 py-2 text-sm font-medium"
                asChild
              >
                <Link href="/auth/sign-up" className="flex items-center space-x-2">
                  <span>Start protecting your reputation</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="default"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-5 py-2 text-sm font-medium"
                asChild
              >
                <Link href="#demo" className="flex items-center space-x-2">
                  <Play className="h-3 w-3" />
                  <span>Watch demo</span>
                </Link>
              </Button>
            </motion.div>

            {/* Trust logos row - minimal */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto"
            >
              <div className="flex items-center justify-center opacity-50">
                <div className="px-2 py-1 bg-gray-100 rounded border border-gray-200">
                  <span className="text-xs text-gray-600">Global Events Co.</span>
                </div>
              </div>
              <div className="flex items-center justify-center opacity-50">
                <div className="px-2 py-1 bg-gray-100 rounded border border-gray-200">
                  <span className="text-xs text-gray-600">Summit Series</span>
                </div>
              </div>
              <div className="flex items-center justify-center opacity-50">
                <div className="px-2 py-1 bg-gray-100 rounded border border-gray-200">
                  <span className="text-xs text-gray-600">Industry Connect</span>
                </div>
              </div>
              <div className="flex items-center justify-center opacity-50">
                <div className="px-2 py-1 bg-gray-100 rounded border border-gray-200">
                  <span className="text-xs text-gray-600">Innovation Forum</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator - minimal */}
        <motion.div
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-5 h-8 border border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-gray-500 rounded-full mt-1"></div>
          </div>
        </motion.div>
      </section>

      {/* STATS SECTION */}
      <section className="py-10 sm:py-14 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, threshold: 0.3 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            <motion.div variants={fadeInScale} className="text-center">
              <div className="mb-2 p-4 rounded-lg glass-stats">
                <AnimatedCounter
                  end={1247}
                  suffix="+"
                  duration={2000}
                  className="text-2xl sm:text-3xl lg:text-[2.25rem] text-black mb-1 leading-none"
                />
                <div className="text-xs text-gray-700 font-medium">
                  Successful events
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInScale} className="text-center">
              <div className="mb-2 p-4 rounded-lg glass-stats">
                <AnimatedCounter
                  end={47}
                  prefix="$"
                  suffix="M+"
                  duration={2200}
                  className="text-2xl sm:text-3xl lg:text-[2.25rem] text-black mb-1 leading-none"
                />
                <div className="text-xs text-gray-700 font-medium">
                  In sponsor deals secured
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInScale} className="text-center">
              <div className="mb-2 p-4 rounded-lg glass-stats">
                <AnimatedCounter
                  end={99.2}
                  suffix="%"
                  duration={2400}
                  className="text-2xl sm:text-3xl lg:text-[2.25rem] text-black mb-1 leading-none"
                />
                <div className="text-xs text-gray-700 font-medium">
                  On-time completion rate
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInScale} className="text-center">
              <div className="mb-2 p-4 rounded-lg glass-stats">
                <AnimatedCounter
                  end={127000}
                  suffix="+"
                  duration={2600}
                  className="text-2xl sm:text-3xl lg:text-[2.25rem] text-black mb-1 leading-none"
                />
                <div className="text-xs text-gray-700 font-medium">
                  Deliverables completed
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIAL - Clean white minimal */}
      <section className="py-14 sm:py-18 bg-white relative">
        {/* Removed background accents for clean white canvas */}

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative p-6 rounded-lg glass-testimonial shadow-lg"
            >
              <blockquote className="text-xl sm:text-2xl lg:text-[1.75rem] font-medium mb-5 leading-[1.3] text-black">
                "Our sponsor retention jumped from 60% to 94% in one season.
                <br className="hidden sm:block" />
                Finally, a system that matches our standards."
              </blockquote>
            </motion.div>

            <motion.div
              className="flex items-center justify-center space-x-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <TestimonialPortrait
                className="w-12 h-12"
                alt="Sarah Kim"
                imagePath="/images/testimonials/sarah-chen.jpg"
              />
              <div className="text-left">
                <p className="font-medium text-lg text-black">Sarah Kim</p>
                <p className="text-gray-600 text-sm">Summit Events, VP Operations</p>
              </div>
              <div className="hidden sm:flex items-center space-x-1 ml-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-11 sm:py-14 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center mb-7"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-bold text-black mb-3 leading-[1.2]">
              Built for high-stakes events
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-[1.4]">
              When your reputation is on the line, precision isn't optional
            </p>
          </motion.div>

          {/* Features grid with depth */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto"
          >
            {[
              {
                icon: Clock,
                title: "Smart deadline tracking",
                description: "Never miss a sponsor deadline again. Automated alerts, risk warnings, and predictive scheduling keep every commitment on track.",
                gradient: "from-blue-500 to-blue-600",
                bgGradient: "from-blue-50 to-blue-100"
              },
              {
                icon: BarChart3,
                title: "Real-time oversight",
                description: "See exactly what's happening across all events and sponsors. Spot issues before they become problems.",
                gradient: "from-purple-500 to-purple-600",
                bgGradient: "from-purple-50 to-purple-100"
              },
              {
                icon: Users,
                title: "Team accountability",
                description: "No more confusion about who owns what. Clear assignments, progress tracking, and automated handoffs.",
                gradient: "from-green-500 to-green-600",
                bgGradient: "from-green-50 to-green-100"
              },
              {
                icon: FileText,
                title: "Proven templates",
                description: "Pre-built sponsor tier frameworks from 1,200+ successful events. Start with what works, customize as needed.",
                gradient: "from-orange-500 to-orange-600",
                bgGradient: "from-orange-50 to-orange-100"
              },
              {
                icon: CheckCircle,
                title: "Proof of delivery",
                description: "Timestamped evidence of every completed deliverable. Show sponsors exactly how you delivered on promises.",
                gradient: "from-teal-500 to-teal-600",
                bgGradient: "from-teal-50 to-teal-100"
              },
              {
                icon: Shield,
                title: "Professional reporting",
                description: "Sponsor-ready reports that showcase your execution excellence. Build trust with transparent performance data.",
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
                <div className="p-4 rounded-lg glass-card hover:glass-subtle glass-focusable transition-all duration-300 shadow-sm hover:shadow-md" tabIndex={0} role="article" aria-labelledby={`feature-${index}`}>
                  <div className={`w-8 h-8 bg-gradient-to-r ${feature.gradient} rounded-md flex items-center justify-center mb-3`}>
                    <feature.icon className="h-4 w-4 text-white" />
                  </div>

                  <h3 id={`feature-${index}`} className="text-lg font-medium text-black mb-2 leading-snug">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-[1.4]">
                    {feature.description}
                  </p>

                  <div className="flex items-center mt-3 text-gray-500 text-xs">
                    <span>Learn more</span>
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* QUOTE CALLOUT */}
      <section className="py-11 sm:py-14 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-lg glass-testimonial shadow-lg"
            >
              <blockquote className="text-xl sm:text-2xl font-medium text-black mb-4 leading-[1.3]">
                "Before SponsorAssure: constant fire-drills and disappointed partners.
                After: bulletproof execution and sponsors asking to expand their packages."
              </blockquote>
            </motion.div>

            <div className="flex items-center justify-center space-x-3">
              <TestimonialPortrait
                className="w-10 h-10"
                alt="Lisa Chang"
                imagePath="/images/testimonials/lisa-chang.jpg"
              />
              <div className="text-left">
                <p className="font-medium text-base text-black">Lisa Chang</p>
                <p className="text-gray-600 text-sm">Sponsor Relations Manager, Industry Connect</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MID-PAGE CTA - Clean white minimal */}
      <section className="py-14 sm:py-18 bg-gray-50 relative">
        {/* Removed background accents for clean minimal look */}

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-bold mb-3 leading-[1.2] text-black">
              Stop losing sponsors
              <br />
              to missed deadlines
            </h2>

            <p className="text-base sm:text-lg mb-5 max-w-xl mx-auto text-gray-600 leading-[1.4]">
              Join 1,200+ event professionals who turned execution chaos into competitive advantage
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                size="default"
                className="bg-black hover:bg-gray-800 text-white px-6 py-2 text-sm font-medium"
                asChild
              >
                <Link href="/auth/sign-up" className="flex items-center space-x-2">
                  <span>Get 99%+ completion rates</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="default"
                className="border-gray-300 text-gray-700 hover:bg-white px-5 py-2 text-sm font-medium"
                asChild
              >
                <Link href="#demo" className="flex items-center space-x-2">
                  <ExternalLink className="h-3 w-3" />
                  <span>Schedule demo</span>
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FINAL STATS */}
      <section className="py-11 sm:py-14 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto text-center"
          >
            <motion.div variants={fadeInScale}>
              <div className="text-2xl sm:text-3xl font-bold text-black mb-1 leading-none">24/7</div>
              <div className="text-gray-600 text-sm">Enterprise support ready</div>
            </motion.div>

            <motion.div variants={fadeInScale}>
              <div className="text-2xl sm:text-3xl font-bold text-black mb-1 flex items-center justify-center leading-none">
                <AnimatedCounter end={3} duration={1500} />
                <span className="ml-1">days</span>
              </div>
              <div className="text-gray-600 text-sm">Full setup and training</div>
            </motion.div>

            <motion.div variants={fadeInScale}>
              <div className="text-2xl sm:text-3xl font-bold text-black mb-1 leading-none">100%</div>
              <div className="text-gray-600 text-sm">Deliverable coverage</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ENHANCED FOOTER */}
      <footer className="bg-gray-100 text-black border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="p-1 bg-black rounded">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-bold">SponsorAssure</span>
              </Link>
              <p className="text-gray-600 text-sm leading-relaxed">
                Enterprise-grade sponsor tracking that transforms partnerships.
              </p>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-medium mb-3 text-black text-sm">Product</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/features" className="hover:text-black transition-colors text-sm">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-black transition-colors text-sm">Pricing</Link></li>
                <li><Link href="/demo" className="hover:text-black transition-colors text-sm">Demo</Link></li>
                <li><Link href="/integrations" className="hover:text-black transition-colors text-sm">Integrations</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-medium mb-3 text-black text-sm">Company</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/about" className="hover:text-black transition-colors text-sm">About</Link></li>
                <li><Link href="/careers" className="hover:text-black transition-colors text-sm">Careers</Link></li>
                <li><Link href="/press" className="hover:text-black transition-colors text-sm">Press</Link></li>
                <li><Link href="/contact" className="hover:text-black transition-colors text-sm">Contact</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-medium mb-3 text-black text-sm">Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/help" className="hover:text-black transition-colors text-sm">Help Center</Link></li>
                <li><Link href="/api" className="hover:text-black transition-colors text-sm">API Docs</Link></li>
                <li><Link href="/status" className="hover:text-black transition-colors text-sm">System Status</Link></li>
                <li><Link href="/community" className="hover:text-black transition-colors text-sm">Community</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-medium mb-3 text-black text-sm">Legal</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/privacy" className="hover:text-black transition-colors text-sm">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-black transition-colors text-sm">Terms</Link></li>
                <li><Link href="/security" className="hover:text-black transition-colors text-sm">Security</Link></li>
                <li><Link href="/compliance" className="hover:text-black transition-colors text-sm">Compliance</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom section */}
          <div className="border-t border-gray-300 pt-6">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-gray-600 text-sm">&copy; 2025 SponsorAssure. All rights reserved.</p>
              <div className="flex items-center space-x-2 mt-3 sm:mt-0">
                <motion.div
                  className="w-2 h-2 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-gray-600 text-xs">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}