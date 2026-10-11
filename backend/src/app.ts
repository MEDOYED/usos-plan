import cors from 'cors';
import express, { type Application } from 'express';
import timetableRoutes from './routes/timetableRoutes.ts';

const app: Application = express();

// Enable CORS for frontend requests (local dev & production)
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

// API routes
app.use('/api', timetableRoutes);

// Root fallback
app.get('/', (_req, res) => {
  res.json({
    name: 'USOS Timetable API',
    description: 'Clean backend service for Uniwersytet Łódzki schedule in Polish',
    version: '1.0.0',
    endpoints: [
      '/api/health',
      '/api/timetable',
      '/api/timetable/today',
      '/api/timetable/summary',
    ],
  });
});

export default app;
