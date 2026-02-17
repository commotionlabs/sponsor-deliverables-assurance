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
    <>
      {/* Mobile backdrop */}
      <div className="lg:hidden fixed inset-0 z-40 bg-gray-600 bg-opacity-75 pointer-events-none"></div>
      
      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-64 bg-white/95 backdrop-blur-xl border-r border-gray-200/50 shadow-xl lg:shadow-none z-50 lg:z-30">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-100">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center space-x-3 group">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg group-hover:shadow-indigo-500/25 transition-all group-hover:scale-105">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                SponsorAssure
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href + '/'))
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group',
                    isActive
                      ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-100 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/80'
                  )}
                >
                  <div className={cn(
                    'p-1.5 rounded-lg transition-colors',
                    isActive 
                      ? 'bg-gradient-to-br from-indigo-100 to-purple-100' 
                      : 'group-hover:bg-gray-100'
                  )}>
                    <item.icon className={cn(
                      'h-5 w-5 transition-colors', 
                      isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'
                    )} />
                  </div>
                  <span className="font-medium">{item.name}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* User menu */}
          <div className="p-4 border-t border-gray-100">
            <div className="relative">
              <Button
                variant="ghost"
                className="w-full justify-between p-3 h-auto hover:bg-gray-50/80 rounded-xl transition-all"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    <span className="text-sm font-bold text-indigo-600">
                      {user.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-left min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {user.user_metadata?.full_name || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                </div>
                <ChevronDown className={cn('h-4 w-4 transition-transform text-gray-400', userMenuOpen ? 'rotate-180' : '')} />
              </Button>

              {userMenuOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-3 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-xl shadow-xl py-2 animate-scale-in">
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50/80 transition-colors rounded-lg mx-2"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <div className="p-1 bg-gray-100 rounded-lg">
                      <Settings className="h-4 w-4 text-gray-600" />
                    </div>
                    <span className="font-medium">Profile Settings</span>
                  </Link>
                  <div className="border-t border-gray-100 my-2"></div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-red-50/80 hover:text-red-700 transition-colors rounded-lg mx-2 w-full text-left group"
                  >
                    <div className="p-1 bg-gray-100 group-hover:bg-red-100 rounded-lg transition-colors">
                      <LogOut className="h-4 w-4 text-gray-600 group-hover:text-red-600 transition-colors" />
                    </div>
                    <span className="font-medium">Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}