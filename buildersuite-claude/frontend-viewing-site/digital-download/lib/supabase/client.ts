import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { isDemoMode, DEMO_USER } from '@/lib/demo-mode'

const createMockQueryChain = (result: { data: any; error: null; count?: number }) => {
  const chain = new Proxy({}, {
    get: (_target, prop) => {
      if (prop === 'then') {
        return (resolve: (value: typeof result) => void) => Promise.resolve(result).then(resolve)
      }
      return () => chain
    },
  })

  return chain as any
}

const createMockClient = () => {
  return {
    auth: {
      getUser: async () => ({ data: { user: DEMO_USER }, error: null }),
      signOut: async () => ({ error: null }),
      signInWithOAuth: async () => ({ data: { provider: 'google', url: '' }, error: null }),
      signInWithOtp: async () => ({ data: null, error: null }),
      signUp: async () => ({ data: { user: null, session: null }, error: null }),
      signInWithPassword: async () => ({ data: { user: DEMO_USER, session: {} }, error: null }),
    },
    from: () => createMockQueryChain({ data: null, error: null, count: 0 }),
    rpc: async () => ({ data: null, error: null }),
    storage: {
      from: () => ({
        upload: async () => ({ data: { path: 'demo/path' }, error: null }),
        getPublicUrl: () => ({ data: { publicUrl: '' } }),
        createSignedUrl: async () => ({ data: { signedUrl: '' }, error: null }),
      }),
    },
  }
}

export const createClient = () => {
  if (isDemoMode()) {
    return createMockClient()
  }

  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
