import mysql from 'mysql2/promise'

// Pool de connexions — réutilisé entre les requêtes en production
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

/**
 * Fonction utilitaire pour exécuter une requête SQL paramétrée.
 * @param {string} sql   - La requête SQL avec des placeholders `?`
 * @param {Array}  params - Les valeurs à injecter à la place des `?`
 * @returns {Promise<Array>} Les lignes retournées par MySQL
 */
export async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params)
  return rows
}

export default pool
