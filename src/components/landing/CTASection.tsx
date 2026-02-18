'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface CTASectionProps {
  title?: string
  primaryCTA?: {
    text: string
    href: string
  }
  secondaryCTA?: {
    text: string
    href: string
  }
  backgroundColor?: 'white' | 'gray'
}

export function CTASection({ 
  title = "Start today",
  primaryCTA = {
    text: "Get Started",
    href: "/auth/sign-up"
  },
  secondaryCTA = {
    text: "Watch Demo",
    href: "#demo"
  },
  backgroundColor = 'white'
}: CTASectionProps) {
  const bgClass = backgroundColor === 'gray' ? 'bg-gray-50' : 'bg-white'

  return (
    <section className={`py-24 sm:py-28 ${bgClass} relative`}>
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 leading-[1.1] text-black">
            {title}
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button
              size="lg"
              className="bg-black hover:bg-gray-800 text-white px-10 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link href={primaryCTA.href}>
                {primaryCTA.text}
              </Link>
            </Button>
            
            {secondaryCTA && (
              <Button
                variant="ghost"
                size="lg"
                className="text-gray-500 hover:text-black px-6 py-4 text-base font-medium"
                asChild
              >
                <Link href={secondaryCTA.href}>
                  {secondaryCTA.text}
                </Link>
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}