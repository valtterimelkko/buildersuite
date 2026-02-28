import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
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
      exchangeCodeForSession: async () => ({ data: { session: null, user: null }, error: null }),
    },
    from: () => createMockQueryChain({ data: null, error: null, count: 0 }),
    rpc: async () => ({ data: null, error: null }),
  }
}

export const createClient = () => {
  if (isDemoMode()) {
    return createMockClient()
  }

  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(
          cookiesToSet: Array<{
            name: string
            value: string
            options: Parameters<typeof cookieStore.set>[2]
          }>
        ) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )
}

export const createServiceClient = () => {
  if (isDemoMode()) {
    return createMockClient()
  }

  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
