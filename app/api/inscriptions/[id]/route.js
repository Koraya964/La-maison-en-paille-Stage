import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

// GET /api/inscriptions/[id]
export async function GET(request, { params }) {
  try {
    const rows = await query(
      `SELECT i.*, s.date_debut, s.date_fin, f.titre as formation_titre
       FROM inscriptions i
       JOIN stages s ON i.stage_id = s.id
       JOIN formations f ON s.formation_id = f.id
       WHERE i.id = ?`,
      [params.id]
    )
    if (!rows.length) return NextResponse.json({ error: 'Inscription introuvable' }, { status: 404 })
    return NextResponse.json(rows[0])
  } catch (error) {
    console.error('[GET /api/inscriptions/[id]]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// PUT /api/inscriptions/[id] — changer le statut (admin)
export async function PUT(request, { params }) {
  try {
    const { statut } = await request.json()
    const statutsValides = ['en_attente', 'confirmee', 'annulee']

    if (!statutsValides.includes(statut)) {
      return NextResponse.json({ error: 'Statut invalide' }, { status: 400 })
    }

    await query(
      'UPDATE inscriptions SET statut = ?, updated_at = NOW() WHERE id = ?',
      [statut, params.id]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[PUT /api/inscriptions/[id]]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// DELETE /api/inscriptions/[id]
export async function DELETE(request, { params }) {
  try {
    await query('DELETE FROM inscriptions WHERE id = ?', [params.id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[DELETE /api/inscriptions/[id]]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
