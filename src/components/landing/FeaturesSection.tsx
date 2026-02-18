'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Shield, BarChart3, Clock, LucideIcon } from 'lucide-react'

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

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

interface FeaturesSectionProps {
  title?: string
  subtitle?: string
  features?: Feature[]
}

const defaultFeatures: Feature[] = [
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
]

export function FeaturesSection({ 
  title = "Three things done right",
  subtitle,
  features = defaultFeatures 
}: FeaturesSectionProps) {
  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section header - minimal */}
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
          {subtitle && (
            <p className="text-lg text-gray-600 leading-[1.4]">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Features grid - Apple simplicity */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className={`grid grid-cols-1 ${features.length <= 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-12 max-w-5xl mx-auto`}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInScale}
              className="text-center bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg"
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
  )
}