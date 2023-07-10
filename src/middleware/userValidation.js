const { validationResult, body, check, param } = require('express-validator');
const User = require('../models/User');

// Validate user input
const validateNewUser = [
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
            return res.status(400).json({ errors: errors.array() });
        }

        next();
    }
];

// Validate user input
const validateUpdateUser = [
    param('id')
        .isMongoId()
        .withMessage('Invalid user ID'),
    check('*')
        .notEmpty()
        .withMessage('Must update at least one field'),
    body('username')
        .optional()
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
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map((error) => error.msg) });
        }
        next();
    }
];

// Validate user input
const validateDeleteUser = [
    param('id')
        .isMongoId()
        .withMessage('Invalid user ID'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(404).json({ errors: errors.array().map((error) => error.msg) });
        }
        next();
    }
];

module.exports = { validateNewUser, validateUpdateUser, validateDeleteUser }