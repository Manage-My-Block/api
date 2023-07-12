const { validationResult, param } = require('express-validator');

// Validate user input
const validateId = [
    param('id')
        .isMongoId()
        .withMessage('Invalid ID'),
    param('commentId')
        .optional()
        .isMongoId()
        .withMessage('Invalid comment ID'),
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

module.exports = { validateId }