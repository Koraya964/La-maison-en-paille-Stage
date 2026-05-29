import { Admin } from '../lib/models/Admin.js';
import { signToken } from '../lib/auth.js';

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: true,
    partitioned: true,
    sameSite: 'none',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours en ms
};

// POST /api/auth/login
export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email et mot de passe requis' });
        }

        const admin = await Admin.findByEmail(email);
        if (!admin) {
            return res.status(401).json({ error: 'Identifiants incorrects' });
        }

        const valid = await Admin.verifyPassword(admin.password, password);
        if (!valid) {
            return res.status(401).json({ error: 'Identifiants incorrects' });
        }

        const token = signToken({ id: admin.id, email: admin.email });
        res.cookie('auth_token', token, COOKIE_OPTIONS);
        return res.json({ success: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erreur serveur' });
    }
}

export async function logout(_req, res) {
    res.clearCookie('auth_token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
    });
    return res.json({ success: true });
}
