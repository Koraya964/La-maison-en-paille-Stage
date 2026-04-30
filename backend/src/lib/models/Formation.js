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

    async findBySlugWithStages(slug) {
        const [formation] = await query('SELECT * FROM formations WHERE slug = ?', [slug]);
        if (!formation) return null;
        const stages = await query(`
      SELECT * FROM stages
      WHERE formation_id = ?
        AND statut NOT IN ('annule', 'termine')
        AND date_debut >= CURDATE()
      ORDER BY date_debut ASC
    `, [formation.id]);
        return {
            ...formation,
            programme: formation.programme
                ? (typeof formation.programme === 'string' ? JSON.parse(formation.programme) : formation.programme)
                : [],
            stages,
        };
    },

    async create({ slug, titre, sous_titre = null, description = null, introduction = null, duree = null, tarif = null, lieu = null, image_hero = null, programme = null, galerie = null }) {
        const result = await query(
            'INSERT INTO formations (slug, titre, sous_titre, description, introduction, duree, tarif, lieu, image_hero, programme, galerie) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [slug, titre, sous_titre, description, introduction, duree, tarif, lieu, image_hero,
                programme ? JSON.stringify(programme) : null,
                galerie ? JSON.stringify(galerie) : null]
        );
        return result.insertId;
    },

    update(id, { slug, titre, sous_titre = null, description = null, introduction = null, duree = null, tarif = null, lieu = null, image_hero = null, programme = null, galerie = null }) {
        return query(
            'UPDATE formations SET slug = ?, titre = ?, sous_titre = ?, description = ?, introduction = ?, duree = ?, tarif = ?, lieu = ?, image_hero = ?, programme = ?, galerie = ? WHERE id = ?',
            [slug, titre, sous_titre, description, introduction, duree, tarif, lieu, image_hero,
                programme ? JSON.stringify(programme) : null,
                galerie ? JSON.stringify(galerie) : null,
                id]
        );
    },

    delete(id) {
        return query('DELETE FROM formations WHERE id = ?', [id]);
    },
};