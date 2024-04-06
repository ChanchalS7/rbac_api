// const User = require('../models/User');
// const bcrypt = require('bcrypt');
// const passport = require('passport');

// exports.register = async (req, res, next) => {
// 	try {
// 		const hashedPassword = await bcrypt.hash(req.body.password, 10);
// 		const newUser = new User({
// 			name: req.body.name,
// 			email: req.body.email,
// 			password: hashedPassword,
// 			bio: req.body.bio,
// 			profileImage: req.body.profileImage,
// 			phoneNumber: req.body.phoneNumber,
// 			address: req.body.address,
// 			isPublic: req.body.isPublic,
// 		});
// 		await newUser.save();
// 		res.status(201).json({ message: 'User registered successfully' });
// 	} catch (err) {
// 		next(err);
// 	}
// };

// exports.login = (req, res, next) => {
// 	passport.authenticate('local', {
// 		successRedirect: '/',
// 		failureRedirect: '/login',
// 	})(req, res, next);
// };

// exports.logout = (req, res, next) => {
// 	req.logout();
// 	res.redirect('/');
// };

// exports.updateProfile = async (req, res, next) => {
// 	try {
// 		const updatedUser = await User.findByIdAndUpdate(
// 			req.user.id,
// 			{
// 				name: req.body.name,
// 				email: req.body.email,
// 				bio: req.body.bio,
// 				profileImage: req.body.profileImage,
// 				phoneNumber: req.body.phoneNumber,
// 				address: req.body.address,
// 				isPublic: req.body.isPublic,
// 			},
// 			{ new: true }
// 		);
// 		res.json(updatedUser);
// 	} catch (err) {
// 		next(err);
// 	}
// };


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
	try {
		const { name, email, password, bio, phone, profileImage } = req.body;
		const user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ message: 'User already exists' });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({
			name,
			email,
			password: hashedPassword,
			bio,
			phone,
			profileImage
		});
		await newUser.save();
		res.status(201).json({ message: 'User registered successfully' });
	} catch (error) {
		console.error('Error in register:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
		res.json({ token });
	} catch (error) {
		console.error('Error in login:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

exports.logout = async (req, res) => {
	try {
		// Perform logout actions if any
		res.json({ message: 'Logged out successfully' });
	} catch (error) {
		console.error('Error in logout:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};
