import asyncHandler from 'express-async-handler';
import axios from 'axios';

const transformCocktail = (cocktail) => {
	let ingredients = ""
	for (let i = 1; i <= 15; i++) {
		if (cocktail[`strIngredient${i}`] && cocktail[`strMeasure${i}`]) {
			ingredients += `${cocktail[`strIngredient${i}`]}: ${cocktail[`strMeasure${i}`]}\n`;
		} else if (cocktail[`strIngredient${i}`]) {
			ingredients += `${cocktail[`strIngredient${i}`]}\n`;
		}
	}
	return {
		name: cocktail.strDrink,
		id: cocktail.idDrink,
		image: cocktail.strDrinkThumb,
		instructions: cocktail.strInstructions,
		ingredients,
		description: cocktail.strCategory,
	};
};

const getRandomCocktails = asyncHandler(async (req, res) => {
	try {
		const response = await axios.get(
			`https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAILS_API_KEY}/randomselection.php`
		);
		const cocktails = response.data.drinks.map(transformCocktail);
		res.json({
			success: true,
			cocktails,
		});
	} catch (error) {
		console.log(error);
		res.json({
			success: false,
			cocktails: [],
		});
	}
});


const getCocktailById = asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const response = await axios.get(
			`https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAILS_API_KEY}/lookup.php?i=${id}`
		);
		const cocktail = response.data.drinks.map(transformCocktail)[0];
		res.json({
			success: true,
			cocktail,
		});
	} catch (error) {
		res.status(404);
		throw new Error('Cocktail not found');
	}
});

export {
	getRandomCocktails,
	getCocktailById,
};
