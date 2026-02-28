import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { Header } from '@/components/dashboard/Header'
import { isDemoMode, DEMO_PROFILE, DEMO_USER } from '@/lib/demo-mode'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // DEMO MODE: Use demo user instead of real authentication
  if (isDemoMode()) {
    const demoSubscription = { tier: 'Starter' }
    const demoLimits = {
      downloads: { used: 2, max: 10 },
      storage: { used: 0, max: 500 },
    }

    return (
      <div className="min-h-screen bg-background flex">
        {/* Sidebar */}
        <Sidebar
          user={DEMO_USER}
          profile={DEMO_PROFILE}
          subscription={demoSubscription}
          limits={demoLimits}
        />

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header user={DEMO_USER} profile={DEMO_PROFILE} />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    )
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Fetch user's workspaces
  const { data: workspaces } = await supabase
    .from('workspaces')
    .select('*, workspace_members!inner(*)')
    .eq('workspace_members.user_id', user.id)
    .order('created_at', { ascending: true })

  const currentWorkspace = workspaces?.[0] || null

  // Fetch subscription for limits
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('workspace_id', currentWorkspace?.id)
    .eq('status', 'active')
    .single()

  // Calculate usage
  const { count: downloadCount } = await supabase
    .from('downloads')
    .select('*', { count: 'exact', head: true })
    .eq('workspace_id', currentWorkspace?.id)

  const limits = {
    downloads: { used: downloadCount || 0, max: subscription?.download_limit || 10 },
    storage: { used: 0, max: subscription?.storage_limit_mb || 500 },
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar
        user={user}
        profile={profile}
        subscription={subscription}
        limits={limits}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header user={user} profile={profile} />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
