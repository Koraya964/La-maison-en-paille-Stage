import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// 1. GET - Récupérer une inscription précise
export async function GET(request, { params }) {
  const { id } = params;
  try {
    const rows = await query(
      `SELECT i.*, s.date_debut, s.date_fin, f.titre as formation_titre
      FROM inscriptions i
      JOIN stages s ON i.stage_id = s.id
      JOIN formations f ON s.formation_id = f.id
      WHERE i.id = ?`,
      [id]
    );
    if (!rows.length) return NextResponse.json({ error: 'Inscription introuvable' }, { status: 404 });
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('[GET /api/inscriptions/[id]]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// 2. PUT - Changer le statut et mettre à jour les places du stage
export async function PUT(request, { params }) {
  const { id } = params;
  try {
    const { statut: nouveauStatut } = await request.json();
    const statutsValides = ['en_attente', 'confirmee', 'annulee', 'liste_attente'];

    if (!statutsValides.includes(nouveauStatut)) {
      return NextResponse.json({ error: 'Statut invalide' }, { status: 400 });
    }

    // A. Récupérer l'ancien statut et le stage_id avant de modifier
    const inscriptions = await query('SELECT stage_id, statut FROM inscriptions WHERE id = ?', [id]);
    if (!inscriptions.length) return NextResponse.json({ error: 'Inscription introuvable' }, { status: 404 });

    const ancienStatut = inscriptions[0].statut;
    const stageId = inscriptions[0].stage_id;

    // B. Mettre à jour l'inscription
    await query(
      'UPDATE inscriptions SET statut = ?, updated_at = NOW() WHERE id = ?',
      [nouveauStatut, id]
    );

    // C. LOGIQUE DE PLACES : Si on passe de "occupant" à "annulé"
    const etaitOccupant = ['en_attente', 'confirmee'].includes(ancienStatut);
    const devientLibre = nouveauStatut === 'annulee';

    if (etaitOccupant && devientLibre) {
      // On libère une place et on s'assure que le stage repasse en "ouvert"
      await query(
        'UPDATE stages SET places_dispo = places_dispo + 1, statut = "ouvert" WHERE id = ?',
        [stageId]
      );
    }
    // D. Cas inverse : Si on repasse une annulation en "confirmée"
    else if (ancienStatut === 'annulee' && !devientLibre) {
      await query(
        'UPDATE stages SET places_dispo = places_dispo - 1 WHERE id = ? AND places_dispo > 0',
        [stageId]
      );
    }

    return NextResponse.json({ success: true, message: 'Statut mis à jour et places synchronisées' });
  } catch (error) {
    console.error('[PUT /api/inscriptions/[id]]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// 3. DELETE - Supprimer et libérer la place si nécessaire
export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    // A. Vérifier si l'inscrit occupait une place avant de le supprimer
    const inscriptions = await query('SELECT stage_id, statut FROM inscriptions WHERE id = ?', [id]);
    if (!inscriptions.length) return NextResponse.json({ error: 'Déjà supprimé' });

    const { stage_id, statut } = inscriptions[0];

    // B. Supprimer l'inscription
    await query('DELETE FROM inscriptions WHERE id = ?', [id]);

    // C. Si c'était une place valide, on la rend au stage
    if (statut === 'en_attente' || statut === 'confirmee') {
      await query(
        'UPDATE stages SET places_dispo = places_dispo + 1, statut = "ouvert" WHERE id = ?',
        [stage_id]
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[DELETE /api/inscriptions/[id]]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}