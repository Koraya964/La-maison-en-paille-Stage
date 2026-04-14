// middleware.js — à placer à la racine du projet Next.js
import { NextResponse } from 'next/server';
import { jwtVerify }    from 'jose';

// jose est déjà disponible dans Next.js — pas besoin de l'installer
// jsonwebtoken ne fonctionne PAS dans le middleware (Edge Runtime)

export async function middleware(request) {
  const token = request.cookies.get('auth_token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch {
    // Token invalide ou expiré
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
