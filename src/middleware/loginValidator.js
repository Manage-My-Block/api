const { body, validationResult } = require('express-validator');

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
            return res.status(400).json({ errors: errors.array() });
        }

        next();
    }
];

module.exports = loginValidator;
