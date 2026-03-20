import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

// GET /api/actualites/[id]
export async function GET(request, { params }) {
  try {
    const rows = await query('SELECT * FROM actualites WHERE id = ?', [params.id])
    if (!rows.length) {
      return NextResponse.json({ error: 'Actualité introuvable' }, { status: 404 })
    }
    return NextResponse.json(rows[0])
  } catch (error) {
    console.error('[GET /api/actualites/[id]]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// PUT /api/actualites/[id]
export async function PUT(request, { params }) {
  try {
    const { titre, contenu, image_url, publie } = await request.json()

    if (!titre || !contenu) {
      return NextResponse.json({ error: 'Titre et contenu requis' }, { status: 400 })
    }

    await query(
      'UPDATE actualites SET titre = ?, contenu = ?, image_url = ?, publie = ?, updated_at = NOW() WHERE id = ?',
      [titre, contenu, image_url || null, publie ? 1 : 0, params.id]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[PUT /api/actualites/[id]]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// DELETE /api/actualites/[id]
export async function DELETE(request, { params }) {
  try {
    await query('DELETE FROM actualites WHERE id = ?', [params.id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[DELETE /api/actualites/[id]]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
