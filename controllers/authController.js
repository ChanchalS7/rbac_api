const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
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

const login = async (req, res) => {
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

const logout = async (req, res) => {
	try {
		// Perform logout actions if any
		res.json({ message: 'Logged out successfully' });
	} catch (error) {
		console.error('Error in logout:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};


module.exports = {
	register,
	login,
	logout
};

