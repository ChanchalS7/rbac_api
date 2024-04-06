const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authMiddleware = async (req, res, next) => {
	try {
		// Extract the token from the request headers
		const token = req.headers.authorization.split(' ')[1];

		// Verify the token
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

		// Fetch user details based on the decoded token
		const user = await User.findById(decodedToken.userId);

		// Attach the user object to the request for further processing
		req.user = user;

		// Proceed to the next middleware or route handler
		next();
	} catch (error) {
		console.error('Error in authMiddleware:', error);
		res.status(401).json({ message: 'Unauthorized' });
	}
};

