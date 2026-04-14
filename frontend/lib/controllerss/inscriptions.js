// lib/controllers/inscriptions.js
import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

// POST /api/inscriptions
export async function createInscription(request) {
  try {
    const body = await request.json()
    const {
      stage_id, nom, prenom, email, telephone, message,
      adresse, cedex, city, is_entreprise, entreprise_name,
      entreprise_email, entreprise_telephone, entreprise_adress,
      entreprise_cedex, entreprise_city, siret,
    } = body

    // 1. Vérifier que le stage existe et est ouvert
    const stages = await query(
      'SELECT * FROM stages WHERE id = ? AND statut IN ("ouvert", "liste_attente")',
      [stage_id]
    )
    if (!stages?.length) {
      return NextResponse.json({ error: 'Stage introuvable ou fermé' }, { status: 404 })
    }

    const stage = stages[0]

    // 2. Statut de l'inscription selon les places restantes
    const statutInscription = stage.places_dispo > 0 ? 'en_attente' : 'liste_attente'

    // 3. Insérer l'inscription
    const result = await query(
      `INSERT INTO inscriptions (
        stage_id, nom, prenom, email, telephone, message,
        adresse, cedex, city,
        is_entreprise,
        entreprise_name, entreprise_email, entreprise_telephone,
        entreprise_adress, entreprise_cedex, entreprise_city,
        entreprise_quality, siret,
        statut
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        stage_id, nom, prenom, email,
        telephone || null, message || null,
        adresse || null, cedex || null, city || null,
        is_entreprise ? 1 : 0,
        entreprise_name || null, entreprise_email || null, entreprise_telephone || null,
        entreprise_adress || null, entreprise_cedex || null, entreprise_city || null,
        null, siret || null,
        statutInscription,
      ]
    )

    // 4. Décompter les places si inscription confirmée
    if (statutInscription === 'en_attente') {
      await query(
        'UPDATE stages SET places_dispo = places_dispo - 1 WHERE id = ? AND places_dispo > 0',
        [stage_id]
      )
      if (stage.places_dispo === 1) {
        await query('UPDATE stages SET statut = "liste_attente" WHERE id = ?', [stage_id])
      }
    }

    return NextResponse.json({
      id: result.insertId,
      statut: statutInscription,
      message: statutInscription === 'liste_attente'
        ? "Inscription enregistrée sur liste d'attente"
        : 'Inscription réussie',
    }, { status: 201 })

  } catch (error) {
    console.error('[createInscription]', error)
    return NextResponse.json({ error: "Une erreur est survenue lors de l'inscription." }, { status: 500 })
  }
}

// GET /api/inscriptions/[id]
export async function getInscription(request, { params }) {
  try {
    const rows = await query(
      `SELECT i.*, s.date_debut, s.date_fin, f.titre AS formation_titre
       FROM inscriptions i
       JOIN stages s ON i.stage_id = s.id
       JOIN formations f ON s.formation_id = f.id
       WHERE i.id = ?`,
      [params.id]
    )
    if (!rows.length) {
      return NextResponse.json({ error: 'Inscription introuvable' }, { status: 404 })
    }
    return NextResponse.json(rows[0])
  } catch (error) {
    console.error('[getInscription]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// PUT /api/inscriptions/[id]
export async function updateInscription(request, { params }) {
  try {
    const { statut: nouveauStatut } = await request.json()
    const statutsValides = ['en_attente', 'confirmee', 'annulee', 'liste_attente']

    if (!statutsValides.includes(nouveauStatut)) {
      return NextResponse.json({ error: 'Statut invalide' }, { status: 400 })
    }

    // Récupérer l'ancien statut et le stage_id
    const rows = await query('SELECT stage_id, statut FROM inscriptions WHERE id = ?', [params.id])
    if (!rows.length) {
      return NextResponse.json({ error: 'Inscription introuvable' }, { status: 404 })
    }

    const { statut: ancienStatut, stage_id: stageId } = rows[0]

    // Mettre à jour le statut
    await query(
      'UPDATE inscriptions SET statut = ?, updated_at = NOW() WHERE id = ?',
      [nouveauStatut, params.id]
    )

    // Synchroniser les places du stage
    const etaitOccupant = ['en_attente', 'confirmee'].includes(ancienStatut)
    const devientLibre = nouveauStatut === 'annulee'

    if (etaitOccupant && devientLibre) {
      // Libérer une place
      await query(
        'UPDATE stages SET places_dispo = places_dispo + 1, statut = "ouvert" WHERE id = ?',
        [stageId]
      )
    } else if (ancienStatut === 'annulee' && !devientLibre) {
      // Réoccuper une place
      await query(
        'UPDATE stages SET places_dispo = places_dispo - 1 WHERE id = ? AND places_dispo > 0',
        [stageId]
      )
    }

    return NextResponse.json({ success: true, message: 'Statut mis à jour et places synchronisées' })

  } catch (error) {
    console.error('[updateInscription]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// DELETE /api/inscriptions/[id]
export async function deleteInscription(request, { params }) {
  try {
    const rows = await query('SELECT stage_id, statut FROM inscriptions WHERE id = ?', [params.id])
    if (!rows.length) {
      return NextResponse.json({ error: 'Déjà supprimé' })
    }

    const { stage_id, statut } = rows[0]

    await query('DELETE FROM inscriptions WHERE id = ?', [params.id])

    // Rendre la place au stage si l'inscription était active
    if (statut === 'en_attente' || statut === 'confirmee') {
      await query(
        'UPDATE stages SET places_dispo = places_dispo + 1, statut = "ouvert" WHERE id = ?',
        [stage_id]
      )
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('[deleteInscription]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
