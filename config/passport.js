const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(
	new LocalStrategy((username, password, done) => {
		User.findOne({ email: username }, (err, user) => {
			if (err) return done(err);
			if (!user) return done(null, false, { message: 'Incorrect email.' });
			if (!user.verifyPassword(password)) return done(null, false, { message: 'Incorrect password.' });
			return done(null, user);
		});
	})
);

passport.use(
	new GoogleStrategy(
		{
			clientID: 'your-google-client-id',
			clientSecret: 'your-google-client-secret',
			callbackURL: 'http://www.example.com/auth/google/callback',
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				const existingUser = await User.findOne({ email: profile.emails[0].value });
				if (existingUser) {
					return done(null, existingUser);
				}
				const newUser = new User({
					name: profile.displayName,
					email: profile.emails[0].value,
					password: 'google-auth',
				});
				await newUser.save();
				done(null, newUser);
			} catch (err) {
				done(err);
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		done(null, user);
	} catch (err) {
		done(err);
	}
});

