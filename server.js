import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import errorHandler from './middleware/errorMiddleware';
import aiRoutes from './routes/aiRoutes.js';
import dbRoutes from './routes/dbRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
	cors({
		origin: '*',
		credentials: true,
	})
);

app.use('/api/ai', aiRoutes);
app.use('/api/db', dbRoutes);

app.use(errorHandler);
