'use client'

import Link from 'next/link'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Shield, BarChart3, ArrowRight, Star, Clock, Play } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'

// Subtle Apple-style animations
const fadeInUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
}

const fadeInScale = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const heroStagger = {
  animate: {
    transition: {
      staggerChildren: 0.15,
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
            {/* Pre-headline badge - minimal */}
            <motion.div variants={fadeInUp} className="mb-4">
              <Badge className="bg-gray-100 text-gray-700 border-gray-200 px-3 py-1 text-xs font-medium">
                1,200+ events • 99.2% completion rate
              </Badge>
            </motion.div>

            {/* Hero headline - Apple-style restraint */}
            <motion.h1
              variants={fadeInScale}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 leading-[1.1] tracking-tight"
            >
              Never miss a
              <br />
              <span className="text-blue-600">
                deliverable
              </span>
            </motion.h1>

            {/* Subtitle - minimal clarity */}
            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-gray-600 mb-6 max-w-xl mx-auto leading-[1.3]"
            >
              Track commitments. Hit deadlines.
              <br />
              Keep sponsors.
            </motion.p>

            {/* CTA buttons - Apple-simple */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
            >
              <Button
                size="lg"
                className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-base font-medium rounded-full"
                asChild
              >
                <Link href="/auth/sign-up">
                  Get Started
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="lg"
                className="text-gray-700 hover:text-black px-6 py-3 text-base font-medium"
                asChild
              >
                <Link href="#demo">
                  Watch Demo
                </Link>
              </Button>
            </motion.div>

            {/* Trust indicator - ultra minimal */}
            <motion.div
              variants={fadeInUp}
              className="text-center"
            >
              <p className="text-sm text-gray-500">
                Trusted by Global Events, Summit Series, and 1,200+ others
              </p>
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

      {/* TESTIMONIAL - Apple-style minimal */}
      <section className="py-16 sm:py-20 bg-gray-50 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-medium mb-8 leading-[1.2] text-black">
              "Sponsor retention jumped from 60% to 94% in one season."
            </blockquote>

            <div className="flex items-center justify-center space-x-3">
              <TestimonialPortrait
                className="w-12 h-12"
                alt="Sarah Kim"
                imagePath="/images/testimonials/sarah-chen.jpg"
              />
              <div className="text-left">
                <p className="font-medium text-base text-black">Sarah Kim</p>
                <p className="text-gray-600 text-sm">Summit Events</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-11 sm:py-14 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header - minimal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 leading-[1.1]">
              Three things done right
            </h2>
          </motion.div>

          {/* Features grid - Apple simplicity */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {[
              {
                icon: Clock,
                title: "Track",
                description: "Never miss a deadline. Automated alerts keep every commitment on track.",
              },
              {
                icon: BarChart3,
                title: "Monitor",
                description: "Real-time oversight across all events and sponsors. Spot issues early.",
              },
              {
                icon: CheckCircle,
                title: "Deliver",
                description: "Proof of completion for every deliverable. Build trust through transparency.",
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInScale}
                className="text-center"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-black mb-4">
                  {feature.title}
                </h3>
                <p className="text-lg text-gray-600 leading-[1.4]">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Removed redundant quote callout for minimal design */}

      {/* CTA - Apple minimal */}
      <section className="py-20 sm:py-24 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 leading-[1.1] text-black">
              Start today
            </h2>

            <Button
              size="lg"
              className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-base font-medium rounded-full"
              asChild
            >
              <Link href="/auth/sign-up">
                Get Started
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Removed redundant final stats for clean minimal design */}

      {/* MINIMAL FOOTER */}
      <footer className="bg-white text-black border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col items-center text-center space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="p-2 bg-black rounded-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-black">
                SponsorAssure
              </span>
            </Link>
            
            <div className="flex items-center space-x-8 text-sm text-gray-600">
              <Link href="/privacy" className="hover:text-black transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-black transition-colors">Terms</Link>
              <Link href="/support" className="hover:text-black transition-colors">Support</Link>
            </div>
            
            <p className="text-gray-500 text-sm">&copy; 2025 SponsorAssure</p>
          </div>
        </div>
      </footer>
    </div>
  )
}