import { Formation } from '../lib/models/Formation.js';

// GET /api/formations/admin
export async function getFormations(req, res) {
    try {
        const formations = await Formation.findAll();
        res.json(formations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

// GET /api/formations/admin/:id
export async function getFormation(req, res) {
    try {
        const formation = await Formation.findById(req.params.id);
        if (!formation) return res.status(404).json({ error: 'Formation introuvable' });
        res.json(formation);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

// POST /api/formations/admin
export async function createFormation(req, res) {
    try {
        const { slug, titre, description, duree, tarif } = req.body;
        if (!slug || !titre) {
            return res.status(400).json({ error: 'slug et titre sont requis' });
        }
        const id = await Formation.create({ slug, titre, description, duree, tarif });
        res.status(201).json({ id });
    } catch (err) {
        console.error(err);
        // Slug déjà utilisé
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Ce slug est déjà utilisé' });
        }
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

// PUT /api/formations/admin/:id
export async function updateFormation(req, res) {
    try {
        const formation = await Formation.findById(req.params.id);
        if (!formation) return res.status(404).json({ error: 'Formation introuvable' });

        const { slug, titre, description, duree, tarif } = req.body;
        if (!slug || !titre) {
            return res.status(400).json({ error: 'slug et titre sont requis' });
        }

        await Formation.update(req.params.id, { slug, titre, description, duree, tarif });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Ce slug est déjà utilisé' });
        }
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

// DELETE /api/formations/admin/:id
export async function deleteFormation(req, res) {
    try {
        const formation = await Formation.findById(req.params.id);
        if (!formation) return res.status(404).json({ error: 'Formation introuvable' });
        await Formation.delete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}