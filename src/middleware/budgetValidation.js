const { validationResult, body, check, param } = require('express-validator');

// Validate contact creation data
const validateBudget = [
    // Validate email
    body('balance')
        .isNumeric()
        .withMessage('Balance must be numeric'),
    body('building')
        .isMongoId()
        .withMessage('Invalid building ID'),
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

module.exports = { validateBudget }