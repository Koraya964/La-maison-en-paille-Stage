import { query } from '../db.js';

export const Realisation = {

  findAll() {
    return query('SELECT * FROM realisations ORDER BY ordre ASC, created_at DESC');
  },

  async findById(id) {
    const [row] = await query('SELECT * FROM realisations WHERE id = ?', [id]);
    return row ?? null;
  },

  async create({ titre = null, description = null, image_url, categorie = 'autre', ordre = 0 }) {
    const result = await query(
      'INSERT INTO realisations (titre, description, image_url, categorie, ordre) VALUES (?, ?, ?, ?, ?)',
      [titre, description, image_url, categorie, ordre]
    );
    return result.insertId;
  },

  update(id, { titre = null, description = null, image_url, categorie, ordre }) {
    return query(
      'UPDATE realisations SET titre = ?, description = ?, image_url = ?, categorie = ?, ordre = ? WHERE id = ?',
      [titre, description, image_url, categorie, ordre, id]
    );
  },

  delete(id) {
    return query('DELETE FROM realisations WHERE id = ?', [id]);
  },
};
