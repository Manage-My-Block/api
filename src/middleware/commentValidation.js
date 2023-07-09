const { body, param } = require('express-validator');

exports.validateComment = [
    param('commentId')
        .optional()
        .isMongoId()
        .withMessage('Invalid todo ID'),
    body('user')
        .optional()
        .isMongoId()
        .withMessage('Comment user must be valid Mongoose ObjectId'),
    body('comment')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Comment is required, must not be empty string'),
]