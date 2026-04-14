import { Router } from 'express';
import argon2 from 'argon2';
import { query } from '../lib/db.js';
import { signToken } from '../lib/auth.js';

const router = Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis' });
    }

    // 1. Chercher l'admin en BDD
    const [admin] = await query('SELECT * FROM admin WHERE email = ?', [email]);
    if (!admin) {
      return res.status(401).json({ error: 'Identifiants incorrects' });
    }

    // 2. Vérifier le mot de passe
    const valid = await argon2.verify(admin.password, password);
    if (!valid) {
      return res.status(401).json({ error: 'Identifiants incorrects' });
    }

    // 3. Créer le token JWT
    const token = signToken({ id: admin.id, email: admin.email });

    // 4. Stocker dans un cookie httpOnly sécurisé
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours en ms
    });

    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
});

// POST /api/auth/logout
router.post('/logout', (_req, res) => {
  res.clearCookie('auth_token');
  return res.json({ success: true });
});

export default router;