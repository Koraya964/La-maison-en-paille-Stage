import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import {
  getAll, getAllAdmin, getById, create, update, remove, getFormationsWithStages,
} from '../controllers/stages.controller.js';

const router = Router();

router.get('/formations', getFormationsWithStages); // avant /:id !
router.get('/', getAll);
router.get('/all', requireAuth, getAllAdmin);
router.get('/:id', getById);
router.post('/', requireAuth, create);
router.put('/:id', requireAuth, update);
router.delete('/:id', requireAuth, remove);

export default router;