const express = require('express');
const AuthController = require('./authController');
const { loginValidator, registerValidator } = require('../../middleware/loginValidation')

const router = express.Router();

// Login route
router.post('/login', loginValidator, AuthController.login);

// Create a new user
router.post('/register', registerValidator, AuthController.register);

module.exports = router;
