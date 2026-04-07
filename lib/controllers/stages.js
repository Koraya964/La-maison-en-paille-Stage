// lib/controllers/stages.js
import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { validateStage } from '@/lib/validate'

// Données fictives quand la BDD n'est pas connectée
function getMockStages(formationId) {
  const base = [
    { id: 1, formation_id: 1, date_debut: '2026-04-12', date_fin: '2026-04-17', places_total: 10, places_dispo: 7, statut: 'ouvert', formation_titre: 'Paille, Terre & Chaux' },
    { id: 2, formation_id: 1, date_debut: '2026-05-10', date_fin: '2026-05-15', places_total: 10, places_dispo: 3, statut: 'ouvert', formation_titre: 'Paille, Terre & Chaux' },
    { id: 3, formation_id: 2, date_debut: '2026-06-01', date_fin: '2026-06-03', places_total: 8, places_dispo: 0, statut: 'complet', formation_titre: 'Poêle de Masse' },
    { id: 4, formation_id: 2, date_debut: '2026-10-05', date_fin: '2026-10-07', places_total: 8, places_dispo: 5, statut: 'ouvert', formation_titre: 'Poêle de Masse' },
    { id: 5, formation_id: 3, date_debut: '2026-09-14', date_fin: '2026-09-15', places_total: 12, places_dispo: 8, statut: 'ouvert', formation_titre: 'Autonomie Photovoltaïque' },
  ]
  return formationId
    ? base.filter(s => s.formation_id === Number(formationId))
    : base
}

// ---------------------------------------------------------------------------
// GET /api/stages
// ---------------------------------------------------------------------------
export async function getStages(request) {
  try {
    const { searchParams } = new URL(request.url)
    const formationId = searchParams.get('formation_id')

    let sql = `
      SELECT s.*, f.titre AS formation_titre, f.slug AS formation_slug, f.tarif
      FROM stages s JOIN formations f ON s.formation_id = f.id
    `
    const params = []
    if (formationId) { sql += ' WHERE s.formation_id = ?'; params.push(formationId) }
    sql += ' ORDER BY s.date_debut ASC'

    return NextResponse.json(await query(sql, params))
  } catch (error) {
    console.error('[getStages]', error)
    // BDD non connectée → données de test
    const formationId = new URL(request.url).searchParams.get('formation_id')
    return NextResponse.json(getMockStages(formationId))
  }
}

// ---------------------------------------------------------------------------
// POST /api/stages
// ---------------------------------------------------------------------------
export async function createStage(request) {
  try {
    const body = await request.json()
    const v = validateStage(body)
    if (!v.ok) return NextResponse.json({ error: v.error }, { status: 400 })

    const { formation_id, date_debut, date_fin, places_total, statut } = body
    const places = Number(places_total) || 10

    const result = await query(
      'INSERT INTO stages (formation_id, date_debut, date_fin, places_total, places_dispo, statut) VALUES (?,?,?,?,?,?)',
      [Number(formation_id), date_debut, date_fin, places, places, statut || 'ouvert']
    )

    return NextResponse.json({ id: result.insertId, success: true }, { status: 201 })
  } catch (error) {
    console.error('[createStage]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// ---------------------------------------------------------------------------
// GET /api/stages/[id]
// ---------------------------------------------------------------------------
export async function getStage(request, { params }) {
  try {
    const rows = await query(
      `SELECT s.*, f.titre AS formation_titre, f.slug AS formation_slug
       FROM stages s JOIN formations f ON s.formation_id = f.id
       WHERE s.id = ?`,
      [params.id]
    )
    if (!rows.length) return NextResponse.json({ error: 'Stage introuvable' }, { status: 404 })
    return NextResponse.json(rows[0])
  } catch (error) {
    console.error('[getStage]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// ---------------------------------------------------------------------------
// PUT /api/stages/[id]
// ---------------------------------------------------------------------------
export async function updateStage(request, { params }) {
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
    console.error('[updateStage]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// ---------------------------------------------------------------------------
// DELETE /api/stages/[id]
// ---------------------------------------------------------------------------
export async function deleteStage(request, { params }) {
  try {
    await query('DELETE FROM stages WHERE id = ?', [params.id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[deleteStage]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
