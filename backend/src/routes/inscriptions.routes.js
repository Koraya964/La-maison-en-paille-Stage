import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import {
  getAll, getById, create, update, remove, getByStage, updateAdmin
} from '../controllers/inscriptions.controller.js';

const router = Router();

router.get('/', requireAuth, getAll);
router.get('/stage/:stage_id', requireAuth, getByStage);
router.get('/:id', requireAuth, getById);
router.post('/', create);
router.put('/:id/admin', requireAuth, updateAdmin);
router.put('/:id', requireAuth, update);
router.delete('/:id', requireAuth, remove);

export default router;
