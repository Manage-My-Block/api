const { body, param, validationResult } = require('express-validator');

const validateComment = [
    // Check id parameter is a mongoDB ID
    param('id')
        .optional()
        .isMongoId()
        .withMessage('Invalid todo ID'),
    // If there is a commentId param, check it is a mongoDB ID
    param('commentId')
        .optional()
        .isMongoId()
        .withMessage('Invalid comment ID'),
    // Validate user field
    body('user')
        .optional()
        .isMongoId()
        .withMessage('Comment user must be valid Mongoose ObjectId'),
    // Validate comment field
    body('comment')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Comment is required, must not be empty string'),
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
]

module.exports = {
    validateComment
}