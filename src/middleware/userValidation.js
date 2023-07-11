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


module.exports = { validateUpdateUser }