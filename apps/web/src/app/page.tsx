import { authGuard } from '@/features/auth/utils/auth-guard'
import { redirect } from 'next/navigation'

/**
 * Home page that redirects to the clusters page after authentication.
 * @returns Redirects to the clusters page.
 */
export default async function Home() {
  await authGuard()

  // TODO: Change to clusters when clusters are done
  redirect('/vms')
}
