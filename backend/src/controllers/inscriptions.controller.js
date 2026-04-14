import { query } from '../lib/db.js';

// GET /api/inscriptions — toutes (dashboard uniquement)
export async function getAll(_req, res) {
  try {
    const rows = await query(`
      SELECT i.*, s.date_debut, s.date_fin, f.titre AS formation_titre
      FROM inscriptions i
      JOIN stages s ON i.stage_id = s.id
      JOIN formations f ON s.formation_id = f.id
      ORDER BY i.created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// GET /api/inscriptions/:id
export async function getById(req, res) {
  try {
    const [row] = await query(`
      SELECT i.*, s.date_debut, s.date_fin, f.titre AS formation_titre
      FROM inscriptions i
      JOIN stages s ON i.stage_id = s.id
      JOIN formations f ON s.formation_id = f.id
      WHERE i.id = ?
    `, [req.params.id]);
    if (!row) return res.status(404).json({ error: 'Non trouvé' });
    res.json(row);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// POST /api/inscriptions — formulaire public
export async function create(req, res) {
  try {
    const { stage_id, nom, prenom, email, telephone, message } = req.body;

    if (!stage_id || !nom || !prenom || !email) {
      return res.status(400).json({ error: 'stage_id, nom, prenom et email sont requis' });
    }

    // Vérifier qu'il reste des places
    const [stage] = await query('SELECT places_dispo FROM stages WHERE id = ?', [stage_id]);
    if (!stage) return res.status(404).json({ error: 'Stage introuvable' });
    if (stage.places_dispo <= 0) {
      return res.status(409).json({ error: 'Plus de places disponibles' });
    }

    const result = await query(
      'INSERT INTO inscriptions (stage_id, nom, prenom, email, telephone, message) VALUES (?, ?, ?, ?, ?, ?)',
      [stage_id, nom, prenom, email, telephone ?? null, message ?? null]
    );

    await query(
      'UPDATE stages SET places_dispo = places_dispo - 1 WHERE id = ?',
      [stage_id]
    );

    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// PUT /api/inscriptions/:id — changer le statut (dashboard)
export async function update(req, res) {
  try {
    const { statut } = req.body;
    const allowed = ['en_attente', 'confirmee', 'annulee'];
    if (!allowed.includes(statut)) {
      return res.status(400).json({ error: 'Statut invalide' });
    }
    await query('UPDATE inscriptions SET statut = ? WHERE id = ?', [statut, req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// DELETE /api/inscriptions/:id
export async function remove(req, res) {
  try {
    await query('DELETE FROM inscriptions WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}
