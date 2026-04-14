import { query } from '../lib/db.js';

// GET /api/actualites — liste publique (publiées uniquement)
export async function getAll(_req, res) {
  try {
    const rows = await query(
      'SELECT * FROM actualites WHERE publie = TRUE ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// GET /api/actualites/all — liste complète (dashboard)
export async function getAllAdmin(_req, res) {
  try {
    const rows = await query('SELECT * FROM actualites ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// GET /api/actualites/:id
export async function getById(req, res) {
  try {
    const [row] = await query('SELECT * FROM actualites WHERE id = ?', [req.params.id]);
    if (!row) return res.status(404).json({ error: 'Non trouvé' });
    res.json(row);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// POST /api/actualites
export async function create(req, res) {
  try {
    const { titre, contenu, image_url, publie = false } = req.body;
    if (!titre || !contenu) {
      return res.status(400).json({ error: 'titre et contenu sont requis' });
    }
    const result = await query(
      'INSERT INTO actualites (titre, contenu, image_url, publie) VALUES (?, ?, ?, ?)',
      [titre, contenu, image_url ?? null, publie]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// PUT /api/actualites/:id
export async function update(req, res) {
  try {
    const { titre, contenu, image_url, publie } = req.body;
    await query(
      'UPDATE actualites SET titre = ?, contenu = ?, image_url = ?, publie = ? WHERE id = ?',
      [titre, contenu, image_url ?? null, publie, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// DELETE /api/actualites/:id
export async function remove(req, res) {
  try {
    await query('DELETE FROM actualites WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}
