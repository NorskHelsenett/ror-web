import { redirect } from 'next/navigation'
import { auth } from '@/config/next-auth'
import { routes } from '@/config/routes'

/**
 * Check if the user is authenticated
 *
 * @remarks
 * If the user is not authenticated, redirect to the sign-in page
 * otherwise, return the session
 */
export async function authGuard() {
  const session = await auth()
  if (!session || session.error === 'RefreshAccessTokenError') {
    redirect(routes.auth.signIn.getHref())
  }
  return session
}

/**
 * Retrieve the session of the current user
 *
 * @remarks
 * It will return null if the user is not authenticated.
 * If you want to redirect to the sign-in page, use the authGuard function.
 */
export async function getSession() {
  const session = await auth()
  return session
}
