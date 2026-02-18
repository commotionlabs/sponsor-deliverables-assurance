'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

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

interface StatItem {
  end: number
  prefix?: string
  suffix?: string
  duration?: number
  label: string
}

interface StatsSectionProps {
  stats?: StatItem[]
}

const defaultStats: StatItem[] = [
  {
    end: 1247,
    suffix: '+',
    duration: 2000,
    label: 'Successful events'
  },
  {
    end: 47,
    prefix: '$',
    suffix: 'M+',
    duration: 2200,
    label: 'In sponsor deals secured'
  },
  {
    end: 99.2,
    suffix: '%',
    duration: 2400,
    label: 'On-time completion rate'
  },
  {
    end: 127000,
    suffix: '+',
    duration: 2600,
    label: 'Deliverables completed'
  }
]

export function StatsSection({ stats = defaultStats }: StatsSectionProps) {
  return (
    <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, threshold: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={fadeInScale} className="text-center">
              <div className="mb-2 p-4 rounded-lg glass-stats">
                <AnimatedCounter
                  end={stat.end}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  duration={stat.duration}
                  className="text-2xl sm:text-3xl lg:text-[2.25rem] text-black mb-1 leading-none"
                />
                <div className="text-xs text-gray-700 font-medium">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}