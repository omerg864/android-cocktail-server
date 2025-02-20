
const errorHandler = async (err, req, res, next) => {
	const statusCode =
		res.statusCode && res.statusCode !== 200 && res.statusCode !== 201
			? res.statusCode
			: 500;
	if (process.env.NODE_ENV === 'development') {
		console.log(err.stack);
	}
	res.status(statusCode).json({
		message: err.message,
		stack: process.env.NODE_ENV === 'production' ? '(:' : err.stack,
	});
};

export default errorHandler;
