import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { DashboardNavigation } from '@/components/dashboard/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/sign-in')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/30">
      {/* Background grid pattern */}
      <div className="fixed inset-0 bg-grid-slate-900/[0.04] bg-[size:20px_20px] pointer-events-none"></div>
      
      <DashboardNavigation user={user} />
      <main className="lg:pl-64 pt-16 lg:pt-0">
        <div className="relative p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}