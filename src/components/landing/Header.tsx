'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Shield } from 'lucide-react'

interface HeaderProps {
  brandName?: string
  showAuth?: boolean
}

export function Header({ 
  brandName = "SponsorAssure",
  showAuth = true 
}: HeaderProps) {
  return (
    <header className="fixed top-0 w-full z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3">
          <div className="p-2 bg-black rounded-lg">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-semibold text-black">
            {brandName}
          </span>
        </Link>
        
        {showAuth && (
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-black hidden sm:inline-flex" asChild>
              <Link href="/auth/sign-in">Sign In</Link>
            </Button>
            <Button size="sm" className="bg-black hover:bg-gray-800 text-white rounded-md" asChild>
              <Link href="/auth/sign-up">Get Started</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}