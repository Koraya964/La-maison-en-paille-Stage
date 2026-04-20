import { Actualite } from '../lib/models/Actualite.js';

// GET /api/actualites — liste publique (publiées uniquement)
export async function getAll(_req, res) {
  try {
    const rows = await Actualite.findAllPublished();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// GET /api/actualites/all — liste complète (dashboard)
export async function getAllAdmin(_req, res) {
  try {
    const rows = await Actualite.findAll();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// GET /api/actualites/:id
export async function getById(req, res) {
  try {
    const row = await Actualite.findById(req.params.id);
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
    const { titre, contenu, image_url, publie } = req.body;
    if (!titre || !contenu) {
      return res.status(400).json({ error: 'titre et contenu sont requis' });
    }
    const id = await Actualite.create({ titre, contenu, image_url, publie });
    res.status(201).json({ id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// PUT /api/actualites/:id
export async function update(req, res) {
  try {
    const { titre, contenu, image_url, publie } = req.body;
    await Actualite.update(req.params.id, { titre, contenu, image_url, publie });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// DELETE /api/actualites/:id
export async function remove(req, res) {
  try {
    await Actualite.delete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}