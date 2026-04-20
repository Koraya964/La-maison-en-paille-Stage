import { query } from '../db.js';

export const Inscription = {
  // Liste complète avec infos stage + formation — dashboard
  findAll() {
    return query(`
      SELECT i.*, s.date_debut, s.date_fin, f.titre AS formation_titre
      FROM inscriptions i
      JOIN stages s ON i.stage_id = s.id
      JOIN formations f ON s.formation_id = f.id
      ORDER BY i.created_at DESC
    `);
  },

  async findById(id) {
    const [row] = await query(`
      SELECT i.*, s.date_debut, s.date_fin, f.titre AS formation_titre
      FROM inscriptions i
      JOIN stages s ON i.stage_id = s.id
      JOIN formations f ON s.formation_id = f.id
      WHERE i.id = ?
    `, [id]);
    return row ?? null;
  },

  // Crée l'inscription et décrémente places_dispo atomiquement
  async create({
    stage_id, nom, prenom, email,
    telephone = null, message = null,
    adresse = null, city = null, cedex = null,
    is_entreprise = false,
    siret = null, entreprise_name = null, entreprise_quality = null,
    entreprise_email = null, entreprise_telephone = null,
    entreprise_adress = null, entreprise_cedex = null, entreprise_city = null,
  }) {
    const [stage] = await query('SELECT places_dispo FROM stages WHERE id = ?', [stage_id]);
    if (!stage) {
      throw Object.assign(new Error('Stage introuvable'), { status: 404 });
    }
    if (stage.places_dispo <= 0) {
      throw Object.assign(new Error('Plus de places disponibles'), { status: 409 });
    }

    const result = await query(
      `INSERT INTO inscriptions (
        stage_id, nom, prenom, email, telephone, message,
        adresse, city, cedex,
        is_entreprise, siret, entreprise_name, entreprise_quality,
        entreprise_email, entreprise_telephone,
        entreprise_adress, entreprise_cedex, entreprise_city
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        stage_id, nom, prenom, email, telephone, message,
        adresse, city, cedex,
        is_entreprise, siret, entreprise_name, entreprise_quality,
        entreprise_email, entreprise_telephone,
        entreprise_adress, entreprise_cedex, entreprise_city,
      ]
    );

    await query(
      'UPDATE stages SET places_dispo = places_dispo - 1 WHERE id = ?',
      [stage_id]
    );

    return result.insertId;
  },

  // Compte les inscrits confirmés pour un stage
  countConfirmed(stage_id) {
    return query(
      'SELECT COUNT(*) AS total FROM inscriptions WHERE stage_id = ? AND statut = "confirmee"',
      [stage_id]
    );
  },

  findConfirmedByStage(stage_id) {
    return query(`
      SELECT nom, prenom, email, telephone
      FROM inscriptions
      WHERE stage_id = ? AND statut = 'confirmee'
      ORDER BY created_at ASC
    `, [stage_id]);
  },

  // Seul le statut est modifiable depuis le dashboard
  updateStatut(id, statut) {
    return query('UPDATE inscriptions SET statut = ? WHERE id = ?', [statut, id]);
  },

  delete(id) {
    return query('DELETE FROM inscriptions WHERE id = ?', [id]);
  },
};