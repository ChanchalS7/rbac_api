const { body, validationResult } = require('express-validator');

exports.validateUpdateProfile = [
	body('name').optional().notEmpty().withMessage('Name is required'),
	body('email').optional().isEmail().withMessage('Invalid email address'),
	body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
	body('bio').optional(),
	body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
	body('profileImage').optional().isURL().withMessage('Invalid URL for profile image'),

	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	}
];
