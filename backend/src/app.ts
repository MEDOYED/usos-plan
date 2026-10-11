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
app.options('*', cors());

app.use(express.json());

// API routes
app.use('/api', timetableRoutes);

// Root & API info fallback
const apiInfo = (_req: express.Request, res: express.Response) => {
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
};

app.get('/', apiInfo);
app.get('/api', apiInfo);

// 404 fallback handler (always returns JSON)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Nie znaleziono ścieżki: ${req.method} ${req.url}`,
  });
});

// Global error handler
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    error: 'Wewnętrzny błąd serwera',
    message: err instanceof Error ? err.message : String(err),
  });
});

export default app;
