import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { Header } from '@/components/dashboard/Header'
import { CommandPalette } from '@/components/dashboard/CommandPalette'
import { isDemoMode, DEMO_PROFILE, DEMO_USER } from '@/lib/demo-mode'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // DEMO MODE: Use demo user instead of real authentication
  if (isDemoMode()) {
    const demoWorkspace = { id: 'demo-workspace', name: 'Demo Workspace' }
    const demoWorkspaces = [demoWorkspace]

    return (
      <div className="min-h-screen bg-background flex">
        {/* Command Palette - Global */}
        <CommandPalette />

        {/* Sidebar */}
        <Sidebar
          user={DEMO_USER}
          profile={DEMO_PROFILE}
          workspaces={demoWorkspaces}
          currentWorkspace={demoWorkspace}
        />

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header
            user={DEMO_USER}
            profile={DEMO_PROFILE}
            currentWorkspace={demoWorkspace}
          />
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

  // Fetch user's workspaces
  const { data: workspaces } = await supabase
    .from('workspaces')
    .select('*, workspace_members!inner(*)')
    .eq('workspace_members.user_id', user.id)
    .order('created_at', { ascending: true })

  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const currentWorkspace = workspaces?.[0] || null

  return (
    <div className="min-h-screen bg-background flex">
      {/* Command Palette - Global */}
      <CommandPalette />

      {/* Sidebar */}
      <Sidebar
        user={user}
        profile={profile}
        workspaces={workspaces || []}
        currentWorkspace={currentWorkspace}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          user={user}
          profile={profile}
          currentWorkspace={currentWorkspace}
        />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
