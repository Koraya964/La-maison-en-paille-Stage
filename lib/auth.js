import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET

if (!SECRET) {
  throw new Error('La variable d\'environnement JWT_SECRET est manquante dans .env.local')
}

/**
 * Crée un token JWT signé.
 * @param {object} payload - Les données à encoder (ex: { id, email })
 * @returns {string} Le token JWT
 */
export function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' })
}

/**
 * Vérifie et décode un token JWT.
 * @param {string} token - Le token à vérifier
 * @returns {object|null} Le payload décodé, ou null si invalide/expiré
 */
export function verifyToken(token) {
  if (!token) return null
  try {
    return jwt.verify(token, SECRET)
  } catch {
    return null
  }
}
