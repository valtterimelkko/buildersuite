/**
 * Demo Mode Configuration
 * Enables viewing dashboards without authentication for demo/viewing purposes
 */

export const isDemoMode = (): boolean => {
  return process.env.NEXT_PUBLIC_DEMO_MODE === 'true'
}

export const DEMO_USER = {
  id: 'demo-user-00000000-0000-0000-0000-000000000000',
  email: 'demo@example.com',
  user_metadata: {
    full_name: 'Demo User',
    avatar_url: undefined,
  },
  app_metadata: {},
  aud: 'authenticated',
  created_at: new Date().toISOString(),
}

export const DEMO_PROFILE = {
  id: 'demo-user-00000000-0000-0000-0000-000000000000',
  email: 'demo@example.com',
  full_name: 'Demo User',
  avatar_url: undefined,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}
