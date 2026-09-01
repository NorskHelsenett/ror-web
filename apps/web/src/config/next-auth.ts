import NextAuth from 'next-auth'
import { getServerSession } from 'next-auth'
import { cache } from 'react'
import { authOptions } from './auth.config'

/** Use this in the route handler */
export const nextAuthHandler = NextAuth(authOptions)

/** Use this on the server to read the session — cached per request to prevent concurrent refresh token races */
export const auth = cache(() => getServerSession(authOptions))
