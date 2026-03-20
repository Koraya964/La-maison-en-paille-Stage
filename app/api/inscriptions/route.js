import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

// GET /api/inscriptions — liste (admin)
export async function GET() {
  try {
    const inscriptions = await query(
      `SELECT i.*, s.date_debut, s.date_fin, f.titre as formation_titre
       FROM inscriptions i
       JOIN stages s ON i.stage_id = s.id
       JOIN formations f ON s.formation_id = f.id
       ORDER BY i.created_at DESC`
    )
    return NextResponse.json(inscriptions)
  } catch (error) {
    console.error('[GET /api/inscriptions]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// POST /api/inscriptions — nouvelle demande d'inscription (public)
export async function POST(request) {
  try {
    const { stage_id, nom, prenom, email, telephone, message } = await request.json()

    if (!stage_id || !nom || !prenom || !email) {
      return NextResponse.json(
        { error: 'stage_id, nom, prénom et email sont requis' },
        { status: 400 }
      )
    }

    // Vérifier que le stage existe et a des places
    const stages = await query(
      'SELECT * FROM stages WHERE id = ? AND statut = "ouvert" AND places_dispo > 0',
      [stage_id]
    )
    if (!stages.length) {
      return NextResponse.json({ error: 'Stage complet ou introuvable' }, { status: 409 })
    }

    // Créer l'inscription
    const result = await query(
      'INSERT INTO inscriptions (stage_id, nom, prenom, email, telephone, message) VALUES (?, ?, ?, ?, ?, ?)',
      [stage_id, nom, prenom, email, telephone || null, message || null]
    )

    return NextResponse.json({ id: result.insertId, success: true }, { status: 201 })
  } catch (error) {
    console.error('[POST /api/inscriptions]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
