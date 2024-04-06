const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { validateUpdateProfile } = require('../validators/profileValidators');

router.put('/profile', authMiddleware, validateUpdateProfile, profileController.updateProfile);

module.exports = router;
