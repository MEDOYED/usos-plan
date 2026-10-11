import app from './app.ts';
import { config } from './config/index.ts';

// Listen only in local development / standalone mode (never in Vercel Serverless)
if (!process.env.VERCEL) {
  app.listen(config.port, () => {
    console.log(`🚀 USOS Timetable backend running at http://localhost:${config.port}`);
    console.log(`📍 Calendar source: ${config.calendarUrl}`);
  });
}

export default app;
