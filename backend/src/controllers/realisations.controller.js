import { Realisation } from '../lib/models/Realisation.js';

// GET /api/realisations — galerie publique
export async function getAll(_req, res) {
  try {
    const rows = await Realisation.findAll();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// GET /api/realisations/:id
export async function getById(req, res) {
  try {
    const row = await Realisation.findById(req.params.id);
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
    const { titre, description, image_url, categorie, ordre } = req.body;
    if (!image_url) {
      return res.status(400).json({ error: 'image_url est requis' });
    }
    const id = await Realisation.create({ titre, description, image_url, categorie, ordre });
    res.status(201).json({ id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// PUT /api/realisations/:id
export async function update(req, res) {
  try {
    const { titre, description, image_url, categorie, ordre } = req.body;
    await Realisation.update(req.params.id, { titre, description, image_url, categorie, ordre });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// DELETE /api/realisations/:id
export async function remove(req, res) {
  try {
    await Realisation.delete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}