import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import actualitesRoutes from './routes/actualites.routes.js';
import stagesRoutes from './routes/stages.routes.js';
import inscriptionsRoutes from './routes/inscriptions.routes.js';
import realisationsRoutes from './routes/realisations.routes.js';

const app = express();
const PORT = process.env.PORT || 4000;

//  Middlewares globaux 

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());

//  Routes 

app.use('/api/auth', authRoutes);
app.use('/api/actualites', actualitesRoutes);
app.use('/api/stages', stagesRoutes);
app.use('/api/inscriptions', inscriptionsRoutes);
app.use('/api/realisations', realisationsRoutes);

//  Sanity check 

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

//  Lancement 

app.listen(PORT, () => {
  console.log(`Backend démarré sur http://localhost:${PORT}`);
});
