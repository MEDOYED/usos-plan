import { Router } from 'express';
import {
  getHealth,
  getSummary,
  getTimetable,
  getToday,
} from '../controllers/timetableController.ts';

const router = Router();

router.get('/health', getHealth);
router.get('/timetable', getTimetable);
router.get('/timetable/today', getToday);
router.get('/timetable/summary', getSummary);

export default router;
