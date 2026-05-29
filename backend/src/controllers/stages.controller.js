import { Stage } from '../lib/models/Stage.js';

// GET /api/stages — liste publique des stages non annulés
export async function getAll(req, res) {
  try {
    const { formation_id, formation } = req.query;
    const rows = await Stage.findAll({ formation_id, formation_slug: formation });
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// GET /api/stages/all — tous (dashboard)
export async function getAllAdmin(_req, res) {
  try {
    const rows = await Stage.findAllAdmin();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// GET /api/stages/:id
export async function getById(req, res) {
  try {
    const row = await Stage.findById(req.params.id);
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
    const { formation_id, date_debut, date_fin, places_total, statut } = req.body;
    if (!formation_id || !date_debut || !date_fin) {
      return res.status(400).json({ error: 'formation_id, date_debut et date_fin sont requis' });
    }
    const id = await Stage.create({ formation_id, date_debut, date_fin, places_total, statut });
    res.status(201).json({ id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// PUT /api/stages/:id
export async function update(req, res) {
  try {
    const { date_debut, date_fin, places_total, places_dispo, statut } = req.body;
    await Stage.update(req.params.id, { date_debut, date_fin, places_total, places_dispo, statut });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// DELETE /api/stages/:id
export async function remove(req, res) {
  try {
    await Stage.delete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// GET /api/stages/formations — vue agrégée pour la page publique formations
export async function getFormationsWithStages(_req, res) {
  try {
    const data = await Stage.findFormationsWithUpcomingStages();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}