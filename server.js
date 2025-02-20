import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import errorHandler from './middleware/errorMiddleware.js';
import aiRoutes from './routes/aiRoutes.js';
import dbRoutes from './routes/dbRoutes.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
	cors({
		origin: '*',
		credentials: true,
	})
);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

app.use('/api/ai', aiRoutes);
app.use('/api/db', dbRoutes);

app.use(errorHandler);
