const { body, validationResult } = require('express-validator');
const User = require('../models/User');

// Login validation middleware
const loginValidator = [
    // Validate username
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username is required')
        .isEmail()
        .withMessage('Username must be an email'),
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
    body('username')
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
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .matches(/^[^0-9]+$/)
        .withMessage('Name must not contain numbers'),
    body('apartment')
        .notEmpty()
        .withMessage('Apartment number is required')
        .isNumeric()
        .custom(async (value) => {

            const user = await User.findOne({ apartment: value });

            if (user) {
                throw new Error('Apartment is already registered');
            }

            return true;
        }),
    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map((error) => error.msg) });
        }

        next();
    }
];


module.exports = { loginValidator, registerValidator };