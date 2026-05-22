// backend/src/controllers/soumissions.controller.js
import { unlink } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Soumission } from '../lib/models/Soumission.js';
import { Realisation } from '../lib/models/Realisation.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// GET /api/soumissions — toutes les soumissions en attente (dashboard)
export async function getAll(_req, res) {
    try {
        const rows = await Soumission.findEnAttente();
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

// POST /api/soumissions — envoi public
export async function create(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Aucune photo reçue.' });
        }

        const { nom, email, titre, description, categorie } = req.body;

        if (!nom?.trim() || !email?.trim()) {
            return res.status(400).json({ error: 'Nom et email sont obligatoires.' });
        }

        const image_url = `${process.env.BACKEND_URL}/images/soumissions/${req.file.filename}`;

        const id = await Soumission.create({
            nom: nom.trim(),
            email: email.trim(),
            titre: titre?.trim() || null,
            description: description?.trim() || null,
            categorie: categorie || 'autre',
            image_url,
        });

        res.status(201).json({ id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

// PUT /api/soumissions/:id — approuver ou rejeter
export async function moderer(req, res) {
    try {
        const { action } = req.body;

        if (!['approuver', 'rejeter'].includes(action)) {
            return res.status(400).json({ error: 'Action invalide.' });
        }

        const soumission = await Soumission.findById(req.params.id);
        if (!soumission) {
            return res.status(404).json({ error: 'Soumission introuvable.' });
        }

        if (action === 'approuver') {
            // 1. Copie dans realisations
            await Realisation.create({
                titre: soumission.titre || `Photo de ${soumission.nom}`,
                description: soumission.description,
                image_url: soumission.image_url,
                categorie: soumission.categorie,
                ordre: 0,
            });
            // 2. Supprime la soumission — gérée uniquement dans réalisations désormais
            await Soumission.delete(req.params.id);

        } else {
            // Rejeter — supprime le fichier et la soumission
            await _deleteFile(soumission.image_url);
            await Soumission.delete(req.params.id);
        }

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

// DELETE /api/soumissions/:id — suppression manuelle depuis le dashboard
export async function remove(req, res) {
    try {
        const soumission = await Soumission.findById(req.params.id);
        if (!soumission) {
            return res.status(404).json({ error: 'Soumission introuvable.' });
        }
        await _deleteFile(soumission.image_url);
        await Soumission.delete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

// ── Utilitaire — supprime le fichier image du disque ──
async function _deleteFile(imageUrl) {
    try {
        const filename = imageUrl.split('/images/soumissions/')[1];
        const filePath = join(__dirname, '../public/images/soumissions', filename);
        await unlink(filePath);
    } catch {
        // Fichier déjà absent — on continue
    }
}