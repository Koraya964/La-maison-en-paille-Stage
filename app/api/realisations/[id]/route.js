import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

// GET /api/realisations/[id]
export async function GET(request, { params }) {
  try {
    const rows = await query('SELECT * FROM realisations WHERE id = ?', [params.id])
    if (!rows.length) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })
    return NextResponse.json(rows[0])
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// PUT /api/realisations/[id]
export async function PUT(request, { params }) {
  try {
    const { titre, description, categorie, ordre } = await request.json()

    await query(
      'UPDATE realisations SET titre = ?, description = ?, categorie = ?, ordre = ? WHERE id = ?',
      [titre || null, description || null, categorie || 'autre', ordre || 0, params.id]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// DELETE /api/realisations/[id]
export async function DELETE(request, { params }) {
  try {
    // Optionnel : supprimer aussi le fichier image du disque
    await query('DELETE FROM realisations WHERE id = ?', [params.id])
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
