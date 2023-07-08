const express = require('express');
const AuthController = require('./authController');
const loginValidator = require('../../middleware/loginValidator')

const router = express.Router();

// Login route
router.post('/login', loginValidator, AuthController.login);

module.exports = router;
