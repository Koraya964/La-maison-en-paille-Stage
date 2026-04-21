import { verifyToken } from '../lib/auth.js';


//   Middleware de protection des routes admin.
//   Lit le token depuis :
//   1. le cookie  auth_token  (httpOnly, posé par /api/auth/login)
//   2. le header  Authorization: Bearer <token>  (pour les clients/tests non-browser)

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
