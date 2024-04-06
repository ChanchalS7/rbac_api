const Role = require('../models/Role');

exports.createRole = async (req, res, next) => {
	try {
		const newRole = new Role({
			name: req.body.name,
		});
		await newRole.save();
		res.status(201).json({ message: 'Role created successfully' });
	} catch (err) {
		next(err);
	}
};