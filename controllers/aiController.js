import asyncHandler from 'express-async-handler';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { DIFFICULTY_OPTIONS, LANGUAGE_OPTIONS } from '../utils/constants';

export const createWithAI = asyncHandler(async (req, res, next) => {
	const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
	const { language, difficulty, ingredients } = req.body;

	ingredients = ingredients || '';

	if (!language || !difficulty) {
		res.status(400);
		throw new Error('Please fill all required fields');
	}

	if (DIFFICULTY_OPTIONS.indexOf(difficulty) === -1) {
		res.status(400);
		throw new Error('Invalid difficulty');
	}

	if (LANGUAGE_OPTIONS.indexOf(language) === -1) {
		res.status(400);
		throw new Error('Invalid language');
	}

	const model = genAI.getGenerativeModel({
		model: 'gemini-1.5-flash',
		generationConfig: {
			responseMimeType: 'application/json',
			responseSchema: {
				type: SchemaType.OBJECT,
				properties: {
					name: { type: SchemaType.STRING },
					description: { type: SchemaType.STRING },
					ingredients: {
						type: SchemaType.STRING,
					},
					instructions: {
						type: SchemaType.STRING,
					},
				},
			},
		},
	});
	const prompt = `Create a cocktail recipe that is ${difficulty} difficulty level and includes ${ingredients} in ${language} language in JSON format`;
	const result = await model.generateContent(prompt);
	const resultJSON = JSON.parse(result.response.text());

	if (!resultJSON.title) {
        res.status(400);
        throw new Error('Please try again');
    }

    if (!resultJSON.description || !resultJSON.ingredients || !resultJSON.instructions || !resultJSON.name) {
        res.status(400);
        throw new Error('Please try again');
    }

	res.status(200).json({
		success: true,
		cocktail: resultJSON,
	});
});
