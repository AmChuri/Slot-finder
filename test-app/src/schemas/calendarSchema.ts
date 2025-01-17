import { z } from 'zod';

export const zCalendarQuerySchema = z.object({
  date: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      'Invalid date format. Expected YYYY-MM-DD.'
    ),
  products: z
    .array(
      z.enum(['Heatpumps', 'SolarPanels'], {
        errorMap: () => ({
          message: 'Product must be either Heatpumps or SolarPanels',
        }),
      })
    )
    .min(1, 'At least one product must be provided.')
    .max(
      2,
      'You can select a maximum of two products (Heatpumps and SolarPanels).'
    ),
  language: z.enum(['German', 'English'], {
    required_error: 'Language must be either German or English',
  }),
  rating: z.enum(['Gold', 'Silver', 'Bronze'], {
    required_error: 'Rating must be one of Gold, Silver, or Bronze.',
  }),
});

export type TCalendarQuery = z.infer<typeof zCalendarQuerySchema>;
