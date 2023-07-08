const { body, param, validationResult } = require('express-validator');

// Validation middleware for creating a todo
exports.validateCreateTodo = [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('dueDate').isISO8601().toDate().withMessage('Invalid due date'),
    body('userId').isMongoId().withMessage('Invalid user ID'),
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
    param('id').isMongoId().withMessage('Invalid todo ID'),
    body('title').optional().trim().notEmpty().withMessage('Title is required'),
    body('description').optional().trim().notEmpty().withMessage('Description is required'),
    body('dueDate').optional().isISO8601().toDate().withMessage('Invalid due date'),
    body('userId').optional().isMongoId().withMessage('Invalid user ID'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
