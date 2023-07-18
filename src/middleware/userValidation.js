const { validationResult, body, check, param } = require('express-validator');
const User = require('../models/User');

// Validate user input
const validateUpdateUser = [
    param('id')
        .isMongoId()
        .withMessage('Invalid user ID'),
    check('*')
        .notEmpty()
        .withMessage('Must update at least one field'),
    body('email')
        .optional()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format')
        .custom(async (value) => {
            // Search for user based on email field
            const user = await User.findOne({ email: value });

            // If user exists then email is already is use
            if (user) {
                throw new Error('Email is already registered');
            }

            return true;
        }),
    body('password')
        .optional()
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('name')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .matches(/^[^0-9]+$/)
        .withMessage('Name must not contain numbers'),
    body('apartment')
        .optional()
        .isNumeric()
        .withMessage('Apartment must be a number')
        .custom(async (value) => {
            // Search for user based on email field
            const user = await User.findOne({ apartment: value });

            // If user exists then email is already is use
            if (user) {
                throw new Error('Apartment is already registered');
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


module.exports = { validateUpdateUser }