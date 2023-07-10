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

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(404).json({ errors: errors.array().map((error) => error.msg) });
        }

        next();
    }
];

module.exports = { validateId }