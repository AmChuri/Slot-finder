import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import calendarRoutes from './routes/calendarRoutes';

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/calendar', calendarRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
