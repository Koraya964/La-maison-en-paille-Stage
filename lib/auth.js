import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET

if (!SECRET && process.env.NODE_ENV !== 'test') {
  throw new Error('JWT_SECRET manquant dans .env.local')
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
