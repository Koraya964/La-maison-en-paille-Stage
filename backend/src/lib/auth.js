import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

/**
 * Crée un token JWT signé (durée : 7 jours).
 * @param {{ id: number, email: string }} payload
 * @returns {string}
 */
export function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' });
}

/**
 * Vérifie un token JWT.
 * @param {string} token
 * @returns {object|null}  payload décodé, ou null si invalide
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}
