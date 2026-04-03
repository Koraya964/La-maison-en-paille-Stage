import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request) {
  try {
    // 1. Récupérer les données envoyées par le formulaire
    const body = await request.json();
    const {
      stage_id, nom, prenom, email, telephone, message,
      adresse, cedex, city, is_entreprise, entreprise_name,
      entreprise_email, entreprise_telephone, entreprise_adress,
      entreprise_cedex, entreprise_city, siret
    } = body;

    // 2. Vérifier si le stage existe et récupérer ses places actuelles
    const stages = await query(
      'SELECT * FROM stages WHERE id = ? AND statut IN ("ouvert", "liste_attente")',
      [stage_id]
    );

    if (!stages || stages.length === 0) {
      return NextResponse.json({ error: 'Stage introuvable ou fermé' }, { status: 404 });
    }

    const stage = stages[0];

    // 3. Détermine le statut de l'inscription selon les places restantes en BDD
    const statutInscription = stage.places_dispo > 0 ? 'en_attente' : 'liste_attente';

    // 4. Insertion de l'inscription dans la base de données
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
    );

    // 5. MISE À JOUR DU STAGE (Décompte des places)
    if (statutInscription === 'en_attente') {
      // On décrémente les places disponibles
      await query(
        'UPDATE stages SET places_dispo = places_dispo - 1 WHERE id = ? AND places_dispo > 0',
        [stage_id]
      );

      // OPTIONNEL : Si après décompte il n'y a plus de place, on change le statut du stage
      if (stage.places_dispo === 1) {
        await query(
          'UPDATE stages SET statut = "liste_attente" WHERE id = ?',
          [stage_id]
        );
      }
    }

    // 6. Réponse de succès
    return NextResponse.json({
      message: statutInscription === 'liste_attente'
        ? 'Inscription enregistrée sur liste d\'attente'
        : 'Inscription réussie',
      id: result.insertId,
      statut: statutInscription
    }, { status: 201 });

  } catch (error) {
    console.error('Erreur API Inscriptions:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'inscription.' },
      { status: 500 }
    );
  }
}