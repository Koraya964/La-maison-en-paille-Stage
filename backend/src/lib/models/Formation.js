import { query } from '../db.js';

export const Formation = {
    findAll() {
        return query('SELECT * FROM formations ORDER BY id ASC');
    },

    async findById(id) {
        const [row] = await query('SELECT * FROM formations WHERE id = ?', [id]);
        return row ?? null;
    },

    async findBySlug(slug) {
        const [row] = await query('SELECT * FROM formations WHERE slug = ?', [slug]);
        return row ?? null;
    },

    async create({ slug, titre, description = null, duree = null, tarif = null }) {
        const result = await query(
            'INSERT INTO formations (slug, titre, description, duree, tarif) VALUES (?, ?, ?, ?, ?)',
            [slug, titre, description, duree, tarif]
        );
        return result.insertId;
    },

    update(id, { slug, titre, description = null, duree = null, tarif = null }) {
        return query(
            'UPDATE formations SET slug = ?, titre = ?, description = ?, duree = ?, tarif = ? WHERE id = ?',
            [slug, titre, description, duree, tarif, id]
        );
    },

    delete(id) {
        return query('DELETE FROM formations WHERE id = ?', [id]);
    },
};