import { authGuard } from '@/features/auth/utils/auth-guard'
import { redirect } from 'next/navigation'

/**
 * Home page that redirects to the clusters page after authentication.
 * @returns Redirects to the clusters page.
 */
export default async function Home() {
  await authGuard()

  redirect('/clusters')
}
