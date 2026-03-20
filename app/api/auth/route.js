import { NextResponse } from 'next/server'
import argon2 from 'argon2'
import { signToken } from '@/lib/auth'
import { query } from '@/lib/db'

// POST /api/auth — connexion admin
export async function POST(request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email et mot de passe requis' }, { status: 400 })
    }

    // 1. Chercher l'admin en base de données
    const rows = await query('SELECT * FROM admin WHERE email = ?', [email])
    const admin = rows[0]

    if (!admin) {
      // Ne pas révéler si l'email existe ou non
      return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 })
    }

    // 2. Vérifier le mot de passe avec argon2
    const valid = await argon2.verify(admin.password, password)
    if (!valid) {
      return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 })
    }

    // 3. Créer le token JWT
    const token = signToken({ id: admin.id, email: admin.email })

    // 4. Stocker dans un cookie httpOnly (inaccessible au JS côté client)
    const response = NextResponse.json({ success: true })
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: '/',
    })

    return response
  } catch (error) {
    console.error('[POST /api/auth]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// DELETE /api/auth — déconnexion
export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.delete('auth_token')
  return response
}
