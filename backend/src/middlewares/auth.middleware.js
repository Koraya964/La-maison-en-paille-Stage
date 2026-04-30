import { verifyToken } from '../lib/auth.js';




export function requireAuth(req, res, next) {
  // 1. Cookie httpOnly
  const cookieToken = req.cookies?.auth_token;

  // 2. Header Authorization
  const authHeader = req.headers.authorization;
  const bearerToken = authHeader?.startsWith('Bearer ')
    ? authHeader.slice(7)
    : null;

  const token = cookieToken || bearerToken;

  if (!token) {
    return res.status(401).json({ error: 'Non authentifié' });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ error: 'Token invalide ou expiré' });
  }

  req.admin = payload; // accessible dans les controllers via req.admin
  next();
}
