import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import {
    getFormations,
    getFormation,
    createFormation,
    updateFormation,
    deleteFormation,
} from '../controllers/formations.controller.js';

const router = Router();

// Toutes les routes admin sont protégées
router.get('/', requireAuth, getFormations);
router.get('/:id', requireAuth, getFormation);
router.post('/', requireAuth, createFormation);
router.put('/:id', requireAuth, updateFormation);
router.delete('/:id', requireAuth, deleteFormation);

export default router;