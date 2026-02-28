'use server'

import { redirect } from 'next/navigation'

export interface Subscription {
  price_id?: string
  current_period_end?: number
  cancel_at_period_end?: boolean
}

export const getSubscription = async (): Promise<Subscription | null> => {
  return null
}

export const createPortalSession = async () => {
  redirect('/settings/billing')
}
