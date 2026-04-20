import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import {
  getAll, getAllAdmin, getById, create, update, remove,
} from '../controllers/actualites.controller.js';

const router = Router();

router.get('/', getAll);           // public
router.get('/all', requireAuth, getAllAdmin); // dashboard — toutes (brouillons inclus)
router.get('/:id', getById);          // public
router.post('/', requireAuth, create);
router.put('/:id', requireAuth, update);
router.delete('/:id', requireAuth, remove);

export default router;
