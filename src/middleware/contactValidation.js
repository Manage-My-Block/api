const { validationResult, body, check, param } = require('express-validator');

// Validate contact creation data
const validateNewContact = [
    body('email')
        .optional()
        .isEmail()
        .withMessage('Invalid email format'),
    body('phoneNumber')
        .notEmpty()
        .withMessage('Phone number is required')
        .isNumeric()
        .withMessage('Phone number must be numeric'),
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .matches(/^[^0-9]+$/)
        .withMessage('Name must not contain numbers'),
    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

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
        .withMessage('Phone number is required')
        .isNumeric()
        .withMessage('Phone number must be numeric'),
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

module.exports = { validateNewContact, validateUpdateContact }