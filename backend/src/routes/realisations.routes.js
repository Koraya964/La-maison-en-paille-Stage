import { Router }     from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import {
  getAll, getById, create, update, remove,
} from '../controllers/realisations.controller.js';

const router = Router();

router.get('/',       getAll);             // public
router.get('/:id',    getById);            // public
router.post('/',      requireAuth, create);
router.put('/:id',    requireAuth, update);
router.delete('/:id', requireAuth, remove);

export default router;
