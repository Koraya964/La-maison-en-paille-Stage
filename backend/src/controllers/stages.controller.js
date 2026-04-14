import { query } from '../lib/db.js';

// GET /api/stages — liste des stages ouverts (avec nom de la formation)
// GET /api/stages?formation_id=1 — stages filtrés par formation
export async function getAll(req, res) {
  try {
    const { formation_id } = req.query;

    let sql = `
      SELECT s.*, f.titre AS formation_titre, f.slug AS formation_slug
      FROM stages s
      JOIN formations f ON s.formation_id = f.id
      WHERE s.statut != 'annule'
    `;
    const params = [];

    if (formation_id) {
      sql += ` AND s.formation_id = ?`;
      params.push(formation_id);
    }

    sql += ` ORDER BY s.date_debut ASC`;

    const rows = await query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// GET /api/stages/all — tous (dashboard)
export async function getAllAdmin(_req, res) {
  try {
    const rows = await query(`
      SELECT s.*, f.titre AS formation_titre
      FROM stages s
      JOIN formations f ON s.formation_id = f.id
      ORDER BY s.date_debut DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// GET /api/stages/:id
export async function getById(req, res) {
  try {
    const [row] = await query(`
      SELECT s.*, f.titre AS formation_titre, f.description AS formation_description,
             f.tarif, f.hebergement, f.repas
      FROM stages s
      JOIN formations f ON s.formation_id = f.id
      WHERE s.id = ?
    `, [req.params.id]);
    if (!row) return res.status(404).json({ error: 'Non trouvé' });
    res.json(row);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// POST /api/stages
export async function create(req, res) {
  try {
    const { formation_id, date_debut, date_fin, places_total = 10, statut = 'ouvert' } = req.body;
    if (!formation_id || !date_debut || !date_fin) {
      return res.status(400).json({ error: 'formation_id, date_debut et date_fin sont requis' });
    }
    const result = await query(
      'INSERT INTO stages (formation_id, date_debut, date_fin, places_total, places_dispo, statut) VALUES (?, ?, ?, ?, ?, ?)',
      [formation_id, date_debut, date_fin, places_total, places_total, statut]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// PUT /api/stages/:id
export async function update(req, res) {
  try {
    const { date_debut, date_fin, places_total, places_dispo, statut } = req.body;
    await query(
      'UPDATE stages SET date_debut = ?, date_fin = ?, places_total = ?, places_dispo = ?, statut = ? WHERE id = ?',
      [date_debut, date_fin, places_total, places_dispo, statut, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// DELETE /api/stages/:id
export async function remove(req, res) {
  try {
    await query('DELETE FROM stages WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}


export async function getFormationsWithStages(_req, res) {
  try {
    const rows = await query(`
      SELECT
        f.id, f.slug, f.titre, f.duree, f.tarif,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id',           s.id,
            'date_debut',   s.date_debut,
            'date_fin',     s.date_fin,
            'places_dispo', s.places_dispo,
            'statut',       s.statut
          )
        ) AS stages
      FROM formations f
      LEFT JOIN stages s
        ON s.formation_id = f.id
        AND s.date_debut >= CURDATE()
      GROUP BY f.id, f.slug, f.titre, f.duree, f.tarif
      ORDER BY f.id ASC
    `);
    const data = rows.map(f => ({
      ...f,
      tarif: parseFloat(f.tarif),
      stages: f.stages ? f.stages.filter(s => s.id !== null) : [],
    }));
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}
