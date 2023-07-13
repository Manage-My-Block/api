const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Building = require('../models/Building');

// Login validation middleware
const loginValidator = [
    // Validate email
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email must be an email'),
    // Validate password
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
    // Handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.status(400).json({ errors: errors.array().map((error) => error.msg) });
        }

        next();
    }
];

// Register validation middleware
const registerValidator = [
    // Validate email
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format')
        .custom(async (value) => {
            const user = await User.findOne({ email: value });
            if (user) {
                throw new Error('Email is already registered');
            }
            return true;
        }),
    // Validate password
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('building')
        .isMongoId()
        .withMessage('Invalid building ID')
        .custom(async (value) => {
            const building = await Building.findById(value);

            if (!building) {
                throw new Error("Building doesn't exist");
            }

            return true;
        }),
    (req, res, next) => {
        // Check for errors
        const errors = validationResult(req);

        // If errors return an error response
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map((error) => error.msg) });
        }

        // Call next middleware
        next();
    }
];


module.exports = { loginValidator, registerValidator };
