'use client'

import { motion, useMotionValue, useDragControls, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Testimonial {
  id: string
  quote: string
  author: string
  company: string
  imagePath?: string
}

interface TestimonialCarouselProps {
  testimonials?: Testimonial[]
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
        onError={(e) => {
          // Fallback to a simple avatar if image fails to load
          e.currentTarget.style.display = 'none'
          const fallback = e.currentTarget.parentElement?.querySelector('.fallback-avatar') as HTMLElement
          if (fallback) fallback.style.display = 'flex'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      {/* Fallback avatar */}
      <div className="fallback-avatar hidden w-full h-full bg-gray-200 items-center justify-center text-gray-600 font-medium text-lg">
        {alt.split(' ').map(n => n[0]).join('')}
      </div>
    </motion.div>
  )
}

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'Sponsor retention jumped from 60% to 94% in one season.',
    author: 'Sarah Kim',
    company: 'Summit Events',
    imagePath: '/images/testimonials/sarah-chen.jpg'
  },
  {
    id: '2', 
    quote: 'We eliminated missed deliverables entirely. Sponsors love the transparency.',
    author: 'Marcus Rodriguez',
    company: 'Peak Sports Marketing',
    imagePath: '/images/testimonials/marcus.jpg'
  },
  {
    id: '3',
    quote: 'The automated tracking saved us 15 hours per event. Game changer.',
    author: 'Jennifer Liu',
    company: 'Velocity Conferences',
    imagePath: '/images/testimonials/jennifer.jpg'
  },
  {
    id: '4',
    quote: 'Sponsor satisfaction scores went from 3.2 to 4.8. Incredible results.',
    author: 'David Thompson',
    company: 'Elite Event Productions',
    imagePath: '/images/testimonials/david.jpg'
  }
]

export function TestimonialCarousel({ testimonials = defaultTestimonials }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const constraintsRef = useRef(null)
  const x = useMotionValue(0)
  const dragControls = useDragControls()

  // Auto-advance functionality
  useEffect(() => {
    if (isDragging) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [testimonials.length, isDragging])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section className="py-20 sm:py-24 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative">
        
        {/* Desktop: Horizontal scrolling rail */}
        <div className="hidden md:block">
          <motion.div
            ref={constraintsRef}
            className="flex space-x-8 overflow-x-auto scrollbar-hide"
            style={{ 
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                className="flex-shrink-0 w-full max-w-3xl mx-auto text-center bg-white/50 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-white/20"
                style={{ scrollSnapAlign: 'center' }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-medium mb-8 leading-[1.2] text-black">
                  "{testimonial.quote}"
                </blockquote>

                <div className="flex items-center justify-center space-x-3">
                  <TestimonialPortrait
                    className="w-12 h-12"
                    alt={testimonial.author}
                    imagePath={testimonial.imagePath || '/images/testimonials/default.jpg'}
                  />
                  <div className="text-left">
                    <p className="font-medium text-base text-black">{testimonial.author}</p>
                    <p className="text-gray-600 text-sm">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation dots */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  index === currentIndex ? 'bg-black w-6' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile: Card-based carousel with touch support */}
        <div className="md:hidden">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={(_, info) => {
                  setIsDragging(false)
                  const threshold = 50
                  
                  if (info.offset.x > threshold) {
                    prevTestimonial()
                  } else if (info.offset.x < -threshold) {
                    nextTestimonial()
                  }
                }}
              >
                <blockquote className="text-xl sm:text-2xl font-medium mb-6 leading-[1.2] text-black">
                  "{testimonials[currentIndex].quote}"
                </blockquote>

                <div className="flex items-center justify-center space-x-3">
                  <TestimonialPortrait
                    className="w-10 h-10"
                    alt={testimonials[currentIndex].author}
                    imagePath={testimonials[currentIndex].imagePath || '/images/testimonials/default.jpg'}
                  />
                  <div className="text-left">
                    <p className="font-medium text-sm text-black">{testimonials[currentIndex].author}</p>
                    <p className="text-gray-600 text-xs">{testimonials[currentIndex].company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows for mobile */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white/80 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-gray-600 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-10 h-10 bg-white/80 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-gray-600 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Progress dots for mobile */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  index === currentIndex ? 'bg-black w-4' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Accessibility: Screen reader announcements */}
        <div
          className="sr-only"
          aria-live="polite"
          aria-atomic="true"
        >
          Testimonial {currentIndex + 1} of {testimonials.length}: {testimonials[currentIndex].quote}
        </div>
      </div>
    </section>
  )
}