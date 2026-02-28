'use server'

import { redirect } from 'next/navigation'

export const createBillingPortalSession = async () => {
  redirect('/settings/billing')
}
