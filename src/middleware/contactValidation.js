const { validationResult, body, check, param } = require('express-validator');

// Validate contact creation data
const validateNewContact = [
    // Validate email
    body('email')
        .optional()
        .isEmail()
        .withMessage('Invalid email format'),
    // Validate phone number
    body('phoneNumber')
        .trim()
        .notEmpty()
        .withMessage('Phone number is required'),
    // Validate name
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required'),
    body('occupation')
        .trim()
        .notEmpty()
        .withMessage('Occupation is required'),
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

// Validate contact update data
const validateUpdateContact = [
    check('*')
        .notEmpty()
        .withMessage('Must update at least one field'),
    param('id')
        .isMongoId()
        .withMessage('Invalid contact ID'),
    body('email')
        .optional()
        .isEmail()
        .withMessage('Invalid email format'),
    body('phoneNumber')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Phone number is required'),
    body('occupation')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Occupation is required'),
    body('name')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Name is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map((error) => error.msg) });
        }
        next();
    }
];

module.exports = { validateNewContact, validateUpdateContact }