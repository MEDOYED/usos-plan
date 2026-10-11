import app from './app.ts';
import { config } from './config/index.ts';

// In standalone / local environment, start HTTP server
if (!process.env.VERCEL) {
  app.listen(config.port, () => {
    console.log(`🚀 USOS Timetable backend running at http://localhost:${config.port}`);
    console.log(`📍 Calendar source: ${config.calendarUrl}`);
  });
}

export default app;
