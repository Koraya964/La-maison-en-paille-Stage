import { Router } from 'express';
import { login, logout } from '../controllers/auth.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';
const router = Router();

router.post('/login', login);
router.post('/logout', logout);

router.get('/me', requireAuth, (req, res) => {
    res.json({ admin: req.admin });
});

export default router;