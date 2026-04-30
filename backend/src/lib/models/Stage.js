import { query } from '../db.js';

export const Stage = {
  findAll({ formation_id } = {}) {
    let sql = `
      SELECT s.*, f.titre AS formation_titre, f.slug AS formation_slug
      FROM stages s
      JOIN formations f ON s.formation_id = f.id
      WHERE s.statut NOT IN ('annule', 'termine')
    `;
    const params = [];
    if (formation_id) {
      sql += ' AND s.formation_id = ?';
      params.push(formation_id);
    }
    sql += ' ORDER BY s.date_debut ASC';
    return query(sql, params);
  },

  findAllAdmin() {
    return query(`
      SELECT s.*, f.titre AS formation_titre
      FROM stages s
      JOIN formations f ON s.formation_id = f.id
      ORDER BY s.date_debut DESC
    `);
  },

  async findById(id) {
    const [row] = await query(`
      SELECT s.*, f.titre AS formation_titre, f.slug AS formation_slug,
             f.duree, f.tarif
      FROM stages s
      JOIN formations f ON s.formation_id = f.id
      WHERE s.id = ?
    `, [id]);
    return row ?? null;
  },

  async create({ formation_id, date_debut, date_fin, places_total = 10, statut = 'ouvert' }) {
    const result = await query(
      'INSERT INTO stages (formation_id, date_debut, date_fin, places_total, places_dispo, statut) VALUES (?, ?, ?, ?, ?, ?)',
      [formation_id, date_debut, date_fin, places_total, places_total, statut]
    );
    return result.insertId;
  },

  update(id, { date_debut, date_fin, places_total, places_dispo, statut }) {
    return query(
      'UPDATE stages SET date_debut = ?, date_fin = ?, places_total = ?, places_dispo = ?, statut = ? WHERE id = ?',
      [date_debut, date_fin, places_total, places_dispo, statut, id]
    );
  },

  delete(id) {
    return query('DELETE FROM stages WHERE id = ?', [id]);
  },

  // ─── Vue agrégée page publique — tous les champs formation inclus ──────────
  async findFormationsWithUpcomingStages() {
    const rows = await query(`
      SELECT
        f.id,
        f.slug,
        f.titre,
        f.sous_titre,
        f.description,
        f.introduction,
        f.duree,
        f.tarif,
        f.lieu,
        f.image_hero,
        f.programme,
        f.galerie,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id',           s.id,
            'date_debut',   s.date_debut,
            'date_fin',     s.date_fin,
            'places_dispo', s.places_dispo,
            'places_total', s.places_total,
            'statut',       s.statut
          )
        ) AS stages
      FROM formations f
      LEFT JOIN stages s
        ON s.formation_id = f.id
        AND s.date_debut >= CURDATE()
        AND s.statut NOT IN ('annule', 'termine')
      GROUP BY
        f.id, f.slug, f.titre, f.sous_titre, f.description,
        f.duree, f.tarif, f.lieu, f.image_hero, f.programme, f.galerie, f.introduction
      ORDER BY f.id ASC
    `);

    return rows.map((f) => ({
      ...f,
      tarif: f.tarif ? parseFloat(f.tarif) : null,
      programme: f.programme
        ? (typeof f.programme === 'string' ? JSON.parse(f.programme) : f.programme)
        : [],
      galerie: f.galerie
        ? (typeof f.galerie === 'string' ? JSON.parse(f.galerie) : f.galerie)
        : [],
      stages: f.stages
        ? f.stages.filter((s) => s.id !== null)
        : [],
    }));
  },

  findConfirmedByStage(stage_id) {
    return query(`
      SELECT nom, prenom, email, telephone
      FROM inscriptions
      WHERE stage_id = ? AND statut = 'confirmee'
      ORDER BY created_at ASC
    `, [stage_id]);
  },

  async findFormationsWithStagesAdmin() {
    return query(`
      SELECT s.*, f.titre AS formation_titre
      FROM stages s
      JOIN formations f ON s.formation_id = f.id
      ORDER BY s.date_debut DESC
    `);
  },

  countConfirmed(stage_id) {
    return query(
      'SELECT COUNT(*) AS total FROM inscriptions WHERE stage_id = ? AND statut = "confirmee"',
      [stage_id]
    );
  },
};