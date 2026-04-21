import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import actualitesRoutes from './routes/actualites.routes.js';
import stagesRoutes from './routes/stages.routes.js';
import inscriptionsRoutes from './routes/inscriptions.routes.js';
import realisationsRoutes from './routes/realisations.routes.js';

const app = express();
const PORT = process.env.PORT || 4000;

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.options('*', cors(corsOptions)); // ← une seule fois, avant tout
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/actualites', actualitesRoutes);
app.use('/api/stages', stagesRoutes);
app.use('/api/inscriptions', inscriptionsRoutes);
app.use('/api/realisations', realisationsRoutes);

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`Backend démarré sur http://localhost:${PORT}`);
});