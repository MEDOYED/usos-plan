import app from './app.ts';
import { config } from './config/index.ts';

const port = process.env.PORT || config.port;

app.listen(port, () => {
  console.log(`🚀 USOS Timetable backend running at http://localhost:${port}`);
  console.log(`📍 Calendar source: ${config.calendarUrl}`);
});

export default app;
