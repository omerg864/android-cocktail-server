import express from 'express';
import { generateCocktail } from '../controllers/aiController.js';
import { authRequest } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(authRequest, generateCocktail);

export default router;