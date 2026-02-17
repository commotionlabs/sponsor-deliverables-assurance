'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Loader2, CheckCircle, ArrowLeft, Eye, EyeOff, Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [organizationName, setOrganizationName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    if (authData.user && !authData.session) {
      // Email confirmation required
      setSuccess(true)
    } else if (authData.session) {
      // User signed up successfully and is authenticated
      router.push('/onboarding')
    }

    setLoading(false)
  }

  const handleGoogleSignUp = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/onboarding`
      }
    })
    
    if (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/50 to-emerald-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:20px_20px]"></div>
        <div className="absolute top-0 right-1/3 w-72 h-72 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-full blur-3xl"></div>
        
        <div className="relative premium-card rounded-lg p-8 w-full max-w-md animate-scale-in">
          <div className="text-center space-y-6">
            <div className="p-4 bg-green-50 rounded-full w-fit mx-auto">
              <Mail className="h-12 w-12 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">Check your email</h1>
              <p className="text-gray-600 mb-4">
                We've sent a confirmation link to
              </p>
              <p className="font-medium text-emerald-600 text-lg break-all">
                {email}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <p className="text-sm text-blue-800 mb-2 font-medium">Next steps:</p>
              <ol className="text-sm text-blue-700 space-y-1">
                <li>1. Check your email (including spam folder)</li>
                <li>2. Click the confirmation link</li>
                <li>3. Complete your account setup</li>
              </ol>
            </div>
            <Button variant="outline" className="w-full btn-premium" asChild>
              <Link href="/auth/sign-in">Back to sign in</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/50 to-emerald-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:20px_20px]"></div>
      <div className="absolute top-0 left-1/3 w-72 h-72 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl"></div>
      
      <div className="relative w-full max-w-lg animate-fade-in">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center space-x-3 mb-8 group">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg group-hover:shadow-emerald-500/25 transition-all group-hover:scale-105">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            SponsorAssure
          </span>
        </Link>

        <div className="premium-card rounded-lg p-8 border hover:border-emerald-200/50 transition-all">
          <div className="space-y-2 mb-8 text-center">
            <h1 className="text-3xl font-bold text-black">Create your account</h1>
            <p className="text-gray-600">
              Start protecting your sponsor relationships today with a 14-day free trial
            </p>
          </div>
          <div className="space-y-6">
            <form onSubmit={handleSignUp} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-12 px-4 bg-white/80 border-gray-200 focus:border-emerald-300 focus:ring-emerald-200"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organizationName" className="text-sm font-medium text-gray-700">Organization</Label>
                  <Input
                    id="organizationName"
                    placeholder="Acme Events"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    className="h-12 px-4 bg-white/80 border-gray-200 focus:border-emerald-300 focus:ring-emerald-200"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Work Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 px-4 bg-white/80 border-gray-200 focus:border-emerald-300 focus:ring-emerald-200"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 px-4 pr-12 bg-white/80 border-gray-200 focus:border-emerald-300 focus:ring-emerald-200"
                    minLength={6}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500">Must be at least 6 characters long</p>
              </div>
              
              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 p-4 rounded-xl animate-scale-in">
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-12 btn-premium bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/25 font-medium" 
                disabled={loading}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 text-gray-500 bg-white/80">Or continue with</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full h-12 btn-premium border-gray-200 hover:border-emerald-200 hover:bg-emerald-50/50 font-medium" 
              onClick={handleGoogleSignUp}
              disabled={loading}
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign up with Google
            </Button>

            <div className="text-xs text-gray-500 text-center leading-relaxed">
              By creating an account, you agree to our{' '}
              <Link href="/terms" className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                Privacy Policy
              </Link>
            </div>

            <div className="text-center text-sm pt-4">
              <span className="text-gray-600">Already have an account? </span>
              <Link href="/auth/sign-in" className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                Sign in
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors group">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}