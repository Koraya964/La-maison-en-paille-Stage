// backend/src/lib/models/Soumission.js
import { query } from '../db.js';

export const Soumission = {

    findAll() {
        return query(
            'SELECT * FROM realisations_soumissions ORDER BY created_at DESC'
        );
    },

    findById(id) {
        return query(
            'SELECT * FROM realisations_soumissions WHERE id = ?',
            [id]
        ).then((rows) => rows[0] ?? null);
    },

    findEnAttente() {
        return query(
            "SELECT * FROM realisations_soumissions WHERE statut = 'en_attente' ORDER BY created_at DESC"
        );
    },

    async create({ nom, email, titre, description, categorie, image_url }) {
        const rows = await query(
            `INSERT INTO realisations_soumissions
        (nom, email, titre, description, categorie, image_url)
       VALUES (?, ?, ?, ?, ?, ?)`,
            [nom, email, titre ?? null, description ?? null, categorie ?? 'autre', image_url]
        );
        return rows.insertId;
    },

    updateStatut(id, statut) {
        return query(
            'UPDATE realisations_soumissions SET statut = ? WHERE id = ?',
            [statut, id]
        );
    },

    delete(id) {
        return query(
            'DELETE FROM realisations_soumissions WHERE id = ?',
            [id]
        );
    },
};