import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

// GET /api/stages/[id]
export async function GET(request, { params }) {
  try {
    const rows = await query(
      `SELECT s.*, f.titre as formation_titre, f.slug as formation_slug
       FROM stages s JOIN formations f ON s.formation_id = f.id
       WHERE s.id = ?`,
      [params.id]
    )
    if (!rows.length) return NextResponse.json({ error: 'Stage introuvable' }, { status: 404 })
    return NextResponse.json(rows[0])
  } catch (error) {
    console.error('[GET /api/stages/[id]]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// PUT /api/stages/[id]
export async function PUT(request, { params }) {
  try {
    const { formation_id, date_debut, date_fin, places_total, places_dispo, statut } = await request.json()

    await query(
      `UPDATE stages SET formation_id = ?, date_debut = ?, date_fin = ?,
       places_total = ?, places_dispo = ?, statut = ?, updated_at = NOW()
       WHERE id = ?`,
      [formation_id, date_debut, date_fin, places_total, places_dispo, statut, params.id]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[PUT /api/stages/[id]]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// DELETE /api/stages/[id]
export async function DELETE(request, { params }) {
  try {
    await query('DELETE FROM stages WHERE id = ?', [params.id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[DELETE /api/stages/[id]]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
