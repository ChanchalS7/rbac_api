// // User.js
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const userSchema = new mongoose.Schema({
// 	name: { type: String, required: true },
// 	email: { type: String, required: true, unique: true },
// 	password: { type: String, required: true },
// 	bio: String,
// 	profileImage: String,
// 	phoneNumber: String,
// 	address: String,
// 	isPublic: { type: Boolean, default: false },
// });

// userSchema.pre('save', async function (next) {
// 	if (!this.isModified('password')) return next();
// 	const salt = await bcrypt.genSalt(10);
// 	this.password = await bcrypt.hash(this.password, salt);
// });

// userSchema.methods.comparePassword = function (candidatePassword, cb) {
// 	bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
// 		cb(err, isMatch);
// 	});
// };

// const User = mongoose.model('User', userSchema);
// module.exports = User;


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	bio: String,
	phone: String,
	profileImage: String,
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user'
	},
	profileView: {
		type: String,
		enum: ['public', 'private'],
		default: 'public'
	}
});

module.exports = mongoose.model('User', userSchema);
