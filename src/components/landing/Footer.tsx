'use client'

import Link from 'next/link'
import { Shield } from 'lucide-react'

interface FooterLink {
  href: string
  text: string
}

interface FooterProps {
  brandName?: string
  links?: FooterLink[]
  copyrightYear?: number
}

const defaultLinks: FooterLink[] = [
  { href: '/privacy', text: 'Privacy' },
  { href: '/terms', text: 'Terms' },
  { href: '/support', text: 'Support' }
]

export function Footer({ 
  brandName = "SponsorAssure",
  links = defaultLinks,
  copyrightYear = 2025
}: FooterProps) {
  return (
    <footer className="bg-white text-black border-t border-gray-200">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="flex flex-col items-center text-center space-y-6">
          <Link href="/" className="flex items-center space-x-2">
            <div className="p-2 bg-black rounded-lg">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-black">
              {brandName}
            </span>
          </Link>
          
          {links.length > 0 && (
            <div className="flex items-center space-x-8 text-sm text-gray-600">
              {links.map((link, index) => (
                <Link 
                  key={index}
                  href={link.href} 
                  className="hover:text-black transition-colors"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          )}
          
          <p className="text-gray-500 text-sm">
            &copy; {copyrightYear} {brandName}
          </p>
        </div>
      </div>
    </footer>
  )
}