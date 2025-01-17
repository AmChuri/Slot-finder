import { Request, Response } from 'express';
import { getAvailableSlots } from '../models/calendarModel';
import { TCalendarQuery } from '../schemas/calendarSchema';

export const queryCalendar = async (req: Request, res: Response) => {
  const queryInput = req.body as TCalendarQuery;

  try {
    const data = await getAvailableSlots(queryInput);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
