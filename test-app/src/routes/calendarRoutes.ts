import express from 'express';
import { queryCalendar } from '../controllers/calendarController';
import { validate } from '../middleware/validate';
import { zCalendarQuerySchema } from '../schemas/calendarSchema';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('hello world5');
});

router.post('/query', validate(zCalendarQuerySchema), queryCalendar);

export default router;
