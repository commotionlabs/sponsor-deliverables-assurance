'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Trophy, TrendingUp, Clock, Shield, Users } from 'lucide-react'

interface ProofItem {
  icon: React.ElementType
  title: string
  description: string
  highlight?: string
}

interface ProofSectionProps {
  title?: string
  subtitle?: string
  proofItems?: ProofItem[]
}

const defaultProofItems: ProofItem[] = [
  {
    icon: Trophy,
    title: 'Award-Winning Results',
    description: 'Named "Best Event Management Tool" by EventTech Awards 2024',
    highlight: 'Industry Recognition'
  },
  {
    icon: TrendingUp,
    title: '312% ROI Average',
    description: 'Clients see massive returns through improved sponsor retention',
    highlight: 'Proven Impact'
  },
  {
    icon: Users,
    title: '50K+ Events Managed',
    description: 'From local meetups to international conferences',
    highlight: 'Battle-Tested'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC 2 compliant with end-to-end encryption',
    highlight: 'Bank-Grade Security'
  },
  {
    icon: Clock,
    title: '2-Min Setup',
    description: 'Get started in minutes, not hours or days',
    highlight: 'Lightning Fast'
  },
  {
    icon: CheckCircle,
    title: '99.9% Uptime',
    description: 'Reliable platform you can count on for critical events',
    highlight: 'Always Available'
  }
]

const fadeInScale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
}

export function ProofSection({ 
  title = "Trusted by industry leaders",
  subtitle = "The numbers speak for themselves",
  proofItems = defaultProofItems 
}: ProofSectionProps) {
  return (
    <section className="py-20 sm:py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 leading-[1.1]">
            {title}
          </h2>
          <p className="text-lg text-gray-600 leading-[1.4]">
            {subtitle}
          </p>
        </motion.div>

        {/* Desktop: Horizontal scrolling grid */}
        <div className="hidden md:block">
          <motion.div
            className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ 
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch'
            }}
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {proofItems.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInScale}
                className="flex-shrink-0 w-80 bg-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg"
                style={{ scrollSnapAlign: 'start' }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-black rounded-full flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    {item.highlight && (
                      <div className="text-xs font-medium text-blue-600 mb-1">
                        {item.highlight}
                      </div>
                    )}
                    <h3 className="text-lg font-semibold text-black mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-[1.4]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile: 2-column grid */}
        <motion.div
          className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {proofItems.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInScale}
              className="bg-white rounded-xl p-4 border border-gray-200"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  {item.highlight && (
                    <div className="text-xs font-medium text-blue-600 mb-1">
                      {item.highlight}
                    </div>
                  )}
                  <h3 className="text-base font-semibold text-black mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-[1.3]">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}