'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useRef } from 'react'

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

const heroStagger = {
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
}

export function HeroSection() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={heroRef} className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-white">
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="container mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10"
      >
        <motion.div
          variants={heroStagger}
          initial="initial"
          animate="animate"
          className="max-w-2xl mx-auto"
        >
          {/* Hero headline - Ultra-concise Apple-style */}
          <motion.h1
            variants={fadeInScale}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-8 leading-[0.95] tracking-tight"
          >
            Never miss a
            <br />
            <span className="text-blue-600">
              deliverable
            </span>
          </motion.h1>

          {/* Subtitle - Extreme minimal clarity */}
          <motion.p
            variants={fadeInUp}
            className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-md mx-auto leading-[1.2]"
          >
            Track sponsors.
            <br />
            Hit deadlines.
          </motion.p>

          {/* Single dominant CTA - Apple minimalism */}
          <motion.div
            variants={fadeInUp}
            className="mb-16"
          >
            <Button
              size="lg"
              className="bg-black hover:bg-gray-800 text-white px-10 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link href="/auth/sign-up">
                Get Started
              </Link>
            </Button>
          </motion.div>

          {/* Trust indicator - ultra quiet */}
          <motion.div
            variants={fadeInUp}
            className="text-center"
          >
            <p className="text-sm text-gray-400">
              Trusted by 1,200+ event organizers
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
  )
}