import { verifyToken } from '../lib/auth.js';




export function requireAuth(req, res, next) {
  const token = req.cookies.auth_token 
    || req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) return res.status(401).json({ error: 'Non autorisé' });
  
  const payload = verifyToken(token);
  if (!payload) return res.status(401).json({ error: 'Token invalide' });
  
  req.admin = payload;
  next();
}
