import asyncHandler from 'express-async-handler';

const authRequest = asyncHandler(async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer ')
	) {
		token = req.headers.authorization.split(' ')[1];
		if (!token) {
			res.status(401);
			throw new Error('Not authorized, no token provided');
		}
		if (token !== process.env.API_KEY) {
			res.status(401);
			throw new Error('Not authorized, invalid token');
		}
		next();
	} else {
		res.status(401);
		throw new Error('Not authorized, no token provided');
	}
});

export { authRequest };
