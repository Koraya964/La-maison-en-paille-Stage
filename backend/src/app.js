import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync } from 'fs';
import next from 'next';
import authRoutes from './routes/auth.routes.js';
import actualitesRoutes from './routes/actualites.routes.js';
import stagesRoutes from './routes/stages.routes.js';
import inscriptionsRoutes from './routes/inscriptions.routes.js';
import realisationsRoutes from './routes/realisations.routes.js';
import soumissionsRoutes from './routes/soumissions.routes.js';
import formationsAdminRoutes from './routes/formations.admin.routes.js';
import { uploadImage } from './routes/upload.js';
import { requireAuth } from './middlewares/auth.middleware.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 4000;
const dev = process.env.NODE_ENV !== 'production';

// Dossier frontend — remonter de src/ vers backend/ puis vers frontend/
const frontendDir = join(__dirname, '../../frontend');

// Init Next.js
const nextApp = next({ dev, dir: frontendDir });
const handle = nextApp.getRequestHandler();

await nextApp.prepare();

const app = express();

// Crée le dossier soumissions s'il n'existe pas encore
mkdirSync(join(__dirname, '../public/images/soumissions'), { recursive: true });

const corsOptions = {
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(join(__dirname, '../public')));

// ── Routes API ──
app.post('/api/upload',            requireAuth, uploadImage);
app.use('/api/auth',               authRoutes);
app.use('/api/actualites',         requireAuth, actualitesRoutes);
app.use('/api/stages',             stagesRoutes);
app.use('/api/inscriptions',       inscriptionsRoutes);
app.use('/api/realisations',       realisationsRoutes);
app.use('/api/soumissions',        soumissionsRoutes);
app.use('/api/formations/admin',   requireAuth, formationsAdminRoutes);
app.get('/api/health',             (_req, res) => res.json({ status: 'ok' }));

// ── Next.js gère tout le reste — doit être EN DERNIER ──
app.all('*', (req, res) => handle(req, res));

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
