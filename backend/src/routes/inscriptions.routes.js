import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import {
  getAll, getById, create, update, remove, getByStage
} from '../controllers/inscriptions.controller.js';

const router = Router();

router.get('/', requireAuth, getAll);   // dashboard uniquement
router.get('/:id', requireAuth, getById);
router.get('/stage/:stage_id', requireAuth, getByStage);
router.post('/', create);                // formulaire public
router.put('/:id', requireAuth, update);
router.delete('/:id', requireAuth, remove);

export default router;
