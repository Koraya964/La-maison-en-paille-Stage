import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

// GET /api/stages — liste des stages (avec infos formation)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const formationId = searchParams.get('formation_id')

    let sql = `
      SELECT s.*, f.titre as formation_titre, f.slug as formation_slug, f.tarif
      FROM stages s
      JOIN formations f ON s.formation_id = f.id
    `
    const params = []

    if (formationId) {
      sql += ' WHERE s.formation_id = ?'
      params.push(formationId)
    }

    sql += ' ORDER BY s.date_debut ASC'

    const stages = await query(sql, params)
    return NextResponse.json(stages)
  } catch (error) {
    console.error('[GET /api/stages]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// POST /api/stages — créer un nouveau stage (admin)
export async function POST(request) {
  try {
    const { formation_id, date_debut, date_fin, places_total, statut } = await request.json()

    if (!formation_id || !date_debut || !date_fin) {
      return NextResponse.json({ error: 'formation_id, date_debut et date_fin sont requis' }, { status: 400 })
    }

    const result = await query(
      `INSERT INTO stages (formation_id, date_debut, date_fin, places_total, places_dispo, statut)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [formation_id, date_debut, date_fin, places_total || 10, places_total || 10, statut || 'ouvert']
    )

    return NextResponse.json({ id: result.insertId, success: true }, { status: 201 })
  } catch (error) {
    console.error('[POST /api/stages]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
