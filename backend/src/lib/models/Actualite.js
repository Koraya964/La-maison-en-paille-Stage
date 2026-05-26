import { query } from '../db.js';

export const Actualite = {

  // Liste publique (publiées uniquement)
  findAllPublished() {
    return query('SELECT * FROM actualites WHERE publie = TRUE ORDER BY created_at DESC');
  },

  // Liste complète (dashboard)
  findAll() {
    return query('SELECT * FROM actualites ORDER BY created_at DESC');
  },

  async findById(id) {
    const [row] = await query('SELECT * FROM actualites WHERE id = ?', [id]);
    return row ?? null;
  },

  async create({ titre, contenu, image_url = null, publie = false }) {
    const result = await query(
      'INSERT INTO actualites (titre, contenu, image_url, publie) VALUES (?, ?, ?, ?)',
      [titre, contenu, image_url, publie]
    );
    return result.insertId;
  },

  update(id, { titre, contenu, image_url = null, publie }) {
    return query(
      'UPDATE actualites SET titre = ?, contenu = ?, image_url = ?, publie = ? WHERE id = ?',
      [titre, contenu, image_url, publie, id]
    );
  },

  delete(id) {
    return query('DELETE FROM actualites WHERE id = ?', [id]);
  },
};
