const User = require('../models/User');

exports.updateProfile = async (req, res) => {
	try {
		const { userId } = req.userData; // Assuming userId is stored in request userData
		const { name, email, password, bio, phone, profileImage, profileView } = req.body;
		// Check if user exists
		let user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		// Update user details
		user.name = name || user.name;
		user.email = email || user.email;
		if (password) {
			const hashedPassword = await bcrypt.hash(password, 10);
			user.password = hashedPassword;
		}
		user.bio = bio || user.bio;
		user.phone = phone || user.phone;
		user.profileImage = profileImage || user.profileImage;
		user.profileView = profileView || user.profileView;
		await user.save();
		res.json({ message: 'Profile updated successfully', user });
	} catch (error) {
		console.error('Error in updateProfile:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};
