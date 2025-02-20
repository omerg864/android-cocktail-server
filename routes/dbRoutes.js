import {
	getRandomCocktails,
    getCocktailById
} from '../controllers/dbController.js';
import express from 'express';
import { authRequest } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/random', authRequest, getRandomCocktails);
router.get('/:id', authRequest, getCocktailById);

export default router;
