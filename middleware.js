import { NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

/**
 * Middleware Next.js — s'exécute avant chaque requête correspondant au `matcher`.
 * Protège automatiquement toutes les routes /dashboard/*.
 * Si le token est absent ou invalide, redirige vers /login.
 */
export function middleware(request) {
  const token = request.cookies.get('auth_token')?.value

  if (!verifyToken(token)) {
    const loginUrl = new URL('/login', request.url)
    // Mémoriser la page demandée pour rediriger après login
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

// Ce middleware s'applique UNIQUEMENT aux routes du dashboard
export const config = {
  matcher: ['/dashboard/:path*'],
}
