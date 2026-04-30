import { Formation } from '../lib/models/Formation.js';

export async function getFormations(req, res) {
    try {
        const formations = await Formation.findAll();
        res.json(formations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

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

export async function createFormation(req, res) {
    try {
        const { slug, titre, sous_titre, description, introduction, duree, tarif, lieu, image_hero, programme, galerie } = req.body;
        if (!slug || !titre) return res.status(400).json({ error: 'slug et titre sont requis' });
        const existing = await Formation.findBySlug(slug);
        if (existing) return res.status(400).json({ error: 'Ce slug est déjà utilisé' });
        const id = await Formation.create({ slug, titre, sous_titre, description, introduction, duree, tarif, lieu, image_hero, programme, galerie });
        res.status(201).json({ id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

export async function updateFormation(req, res) {
    try {
        const id = Number(req.params.id);
        const formation = await Formation.findById(id);
        if (!formation) return res.status(404).json({ error: 'Formation introuvable' });

        const { slug, titre, sous_titre, description, introduction, duree, tarif, lieu, image_hero, programme, galerie } = req.body;
        if (!slug || !titre) return res.status(400).json({ error: 'slug et titre sont requis' });

        const existing = await Formation.findBySlug(slug);
        if (existing && existing.id !== id) return res.status(400).json({ error: 'Ce slug est déjà utilisé par une autre formation' });

        await Formation.update(id, { slug, titre, sous_titre, description, introduction, duree, tarif, lieu, image_hero, programme, galerie });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

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