// backend/src/routes/soumissions.routes.js
import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { v4 as uuid } from 'uuid';
import { getAll, create, moderer, remove } from '../controllers/soumissions.controller.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Multer dédié aux soumissions — dossier séparé des réalisations validées
const storage = multer.diskStorage({
    destination: join(__dirname, '../public/images/soumissions'),
    filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `soumission_${uuid()}${ext}`);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2 Mo
    fileFilter: (_req, file, cb) => {
        if (file.mimetype.startsWith('image/')) cb(null, true);
        else cb(new Error('Format non supporté. JPG, PNG ou WebP uniquement.'));
    },
});

const router = Router();

router.get('/', requireAuth, getAll);   // dashboard
router.post('/', upload.single('image'), create);   // public — multer avant le controller
router.put('/:id', requireAuth, moderer);  // approuver | rejeter
router.delete('/:id', requireAuth, remove);   // suppression définitive

export default router;