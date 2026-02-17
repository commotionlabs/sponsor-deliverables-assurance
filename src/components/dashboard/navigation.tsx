'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { 
  Shield, 
  LayoutDashboard, 
  Calendar, 
  Users, 
  FileText, 
  AlertTriangle, 
  Settings, 
  LogOut,
  ChevronDown,
  Building2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { User } from '@supabase/auth-helpers-nextjs'

interface NavigationProps {
  user: User
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Events', href: '/dashboard/events', icon: Calendar },
  { name: 'Sponsors', href: '/dashboard/sponsors', icon: Building2 },
  { name: 'Deliverables', href: '/dashboard/deliverables', icon: FileText },
  { name: 'Risk Overview', href: '/dashboard/risk', icon: AlertTriangle },
  { name: 'Templates', href: '/dashboard/templates', icon: Users },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function DashboardNavigation({ user }: NavigationProps) {
  const pathname = usePathname()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <div className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200">
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center space-x-2 mb-8">
          <Shield className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">SponsorAssure</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                <item.icon className={cn('h-5 w-5', isActive ? 'text-blue-700' : 'text-gray-400')} />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* User menu */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <div className="relative">
          <Button
            variant="ghost"
            className="w-full justify-between p-2"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-blue-600">
                  {user.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.user_metadata?.full_name || user.email}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
            <ChevronDown className={cn('h-4 w-4 transition-transform', userMenuOpen ? 'rotate-180' : '')} />
          </Button>

          {userMenuOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
              <Link
                href="/dashboard/profile"
                className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setUserMenuOpen(false)}
              >
                <Settings className="h-4 w-4" />
                <span>Profile Settings</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}