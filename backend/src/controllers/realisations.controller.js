import { query } from '../lib/db.js';

// GET /api/realisations — galerie publique
export async function getAll(_req, res) {
  try {
    const rows = await query('SELECT * FROM realisations ORDER BY ordre ASC, created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// GET /api/realisations/:id
export async function getById(req, res) {
  try {
    const [row] = await query('SELECT * FROM realisations WHERE id = ?', [req.params.id]);
    if (!row) return res.status(404).json({ error: 'Non trouvé' });
    res.json(row);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// POST /api/realisations
export async function create(req, res) {
  try {
    const { titre, description, image_url, categorie = 'autre', ordre = 0 } = req.body;
    if (!image_url) {
      return res.status(400).json({ error: 'image_url est requis' });
    }
    const result = await query(
      'INSERT INTO realisations (titre, description, image_url, categorie, ordre) VALUES (?, ?, ?, ?, ?)',
      [titre ?? null, description ?? null, image_url, categorie, ordre]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// PUT /api/realisations/:id
export async function update(req, res) {
  try {
    const { titre, description, image_url, categorie, ordre } = req.body;
    await query(
      'UPDATE realisations SET titre = ?, description = ?, image_url = ?, categorie = ?, ordre = ? WHERE id = ?',
      [titre ?? null, description ?? null, image_url, categorie, ordre, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// DELETE /api/realisations/:id
export async function remove(req, res) {
  try {
    await query('DELETE FROM realisations WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}
