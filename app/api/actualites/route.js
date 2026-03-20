import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

// GET /api/actualites — liste des actualités publiées (public)
// GET /api/actualites?all=true — toutes les actualités (admin uniquement)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const showAll = searchParams.get('all') === 'true'

    const sql = showAll
      ? 'SELECT * FROM actualites ORDER BY created_at DESC'
      : 'SELECT * FROM actualites WHERE publie = TRUE ORDER BY created_at DESC'

    const actualites = await query(sql)
    return NextResponse.json(actualites)
  } catch (error) {
    console.error('[GET /api/actualites]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// POST /api/actualites — créer une nouvelle actualité (admin)
export async function POST(request) {
  try {
    const { titre, contenu, image_url, publie } = await request.json()

    if (!titre || !contenu) {
      return NextResponse.json({ error: 'Titre et contenu requis' }, { status: 400 })
    }

    const result = await query(
      'INSERT INTO actualites (titre, contenu, image_url, publie) VALUES (?, ?, ?, ?)',
      [titre, contenu, image_url || null, publie ? 1 : 0]
    )

    return NextResponse.json({ id: result.insertId, success: true }, { status: 201 })
  } catch (error) {
    console.error('[POST /api/actualites]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
