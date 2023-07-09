const { check, body, param, validationResult } = require('express-validator');

// Validation middleware for creating a todo
exports.validateCreateTodo = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required'),
    body('dueDate')
        .isISO8601()
        .toDate()
        .withMessage('Invalid due date'),
    body('author')
        .isMongoId()
        .withMessage('Invalid user ID'),
    body('isComplete')
        .isBoolean()
        .withMessage('Complete must be boolean'),
    body('status')
        .trim()
        .notEmpty()
        .withMessage('Status is required'),
    body('needsVote')
        .optional()
        .isBoolean()
        .withMessage('needsVote must be boolean'),
    body('vote')
        .optional()
        .isArray()
        .withMessage('Vote must be an array'),
    body('vote.*.user')
        .optional()
        .isMongoId()
        .withMessage('User value in Vote array object must be valid Mongoose ObjectId'),
    body('vote.*.ballot')
        .optional()
        .isBoolean()
        .withMessage('Ballot value in Vote array object must be a boolean'),
    body('comments')
        .optional()
        .isArray()
        .withMessage('Comments must be an array'),
    body('comments.*.user')
        .optional()
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
    body('cost')
        .optional()
        .isNumeric()
        .withMessage('Cost must be a number'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

// Validation middleware for updating a todo
exports.validateUpdateTodo = [
    check('*')
        .notEmpty()
        .withMessage('Must update at least one field'),
    param('id')
        .isMongoId()
        .withMessage('Invalid todo ID'),
    body('title')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Title must not be empty'),
    body('description')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Description must not be empty'),
    body('dueDate')
        .optional()
        .isISO8601()
        .toDate()
        .withMessage('Invalid due date'),
    body('isComplete')
        .optional()
        .isBoolean()
        .withMessage('Complete must be boolean'),
    body('status')
        .trim()
        .notEmpty()
        .withMessage('Status must not be empty'),
    body('needsVote')
        .optional()
        .isBoolean()
        .withMessage('needsVote must be boolean'),
    body('vote')
        .optional()
        .isArray()
        .withMessage('Vote must be an array'),
    body('vote.*.user')
        .optional()
        .isMongoId()
        .withMessage('User value in Vote array object must be valid Mongoose ObjectId'),
    body('vote.*.ballot')
        .optional()
        .isBoolean()
        .withMessage('Ballot value in Vote array object must be a boolean'),
    body('comments')
        .optional()
        .isArray()
        .withMessage('Comments must be an array'),
    body('comments.*.user')
        .optional()
        .isMongoId()
        .withMessage('User in Comments array objects must be valid Mongoose ObjectId'),
    body('comments.*.comment')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Comment must not be empty'),
    body('images')
        .optional()
        .isArray()
        .withMessage('Images must be an array'),
    body('images.*')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Image link must not be empty'),
    body('cost')
        .optional()
        .isNumeric()
        .withMessage('Cost must be a number'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map((error) => error.msg) });
        }
        next();
    },
];