const { body, param } = require('express-validator');

exports.validateComment = [
    param('id')
        .optional()
        .isMongoId()
        .withMessage('Invalid todo ID'),
    param('commentId')
        .optional()
        .isMongoId()
        .withMessage('Invalid comment ID'),
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