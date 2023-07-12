const { check, body, param, validationResult } = require('express-validator');

// Validation middleware for creating a Notice
const validateCreateNotice = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required'),
    body('author')
        .isMongoId()
        .withMessage('Invalid user ID'),
    body('comments')
        .optional()
        .isArray()
        .withMessage('Comments must be an array'),
    body('comments.*.user')
        .isMongoId()
        .withMessage('User in Comments array objects must be valid Mongoose ObjectId'),
    body('comments.*.comment')
        .trim()
        .notEmpty()
        .withMessage('Comment is required'),
    body('images')
        .optional()
        .isArray()
        .withMessage('Images must be an array'),
    body('images.*')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Image link is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

// Validation middleware for updating a Notice
const validateUpdateNotice = [
    check('*')
        .notEmpty()
        .withMessage('Must update at least one field'),
    param('id')
        .isMongoId()
        .withMessage('Invalid Notice ID'),
    body('title')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Title is required'),
    body('description')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Description is required'),
    body('comments')
        .optional()
        .isArray()
        .withMessage('Comments must be an array'),
    body('comments.*.user')
        .isMongoId()
        .withMessage('User in Comments array objects must be valid Mongoose ObjectId'),
    body('comments.*.comment')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Comment is required'),
    body('images')
        .optional()
        .isArray()
        .withMessage('Images must be an array'),
    body('images.*')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Image link is required'),
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

module.exports = {
    validateCreateNotice,
    validateUpdateNotice
}