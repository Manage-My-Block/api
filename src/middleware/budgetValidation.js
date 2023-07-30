const { validationResult, body, check, param } = require('express-validator');
const Budget = require('../models/Budget');
const Building = require('../models/Building');

// Validate contact creation data
const validateBudget = [
    // Validate name
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required'),
    // Validate email
    body('balance')
        .optional()
        .isNumeric()
        .withMessage('Balance must be numeric'),
    body('building')
        .isMongoId()
        .withMessage('Invalid building ID')
        .custom(async (value) => {
            // Search for building based on building field
            const building = await Building.findById(value);

            // If building doesn't exists then throw error
            if (!building) {
                throw new Error('Building not registered');
            }

            // const budget = await Budget.find({ building: value })

            // // If building doesn't exists then throw error
            // if (budget) {
            //     throw new Error('Only one budget per building');
            // }

            return true;
        }),
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


// Validate contact creation data
const validateUpdateBudget = [
    // Validate name
    body('name')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Name is required'),
    // Validate transaction
    body('transaction')
        .optional()
        .isObject()
        .withMessage('Transaction must be an object')
        .bail() // Stops validation if transaction is not an object
        .custom((value) => {
            // If the transaction field exists, validate its properties
            if (value) {
                if (!('amount' in value)) {
                    throw new Error('Transaction amount is required.');
                } else if (typeof value.amount !== 'number') {
                    throw new Error('Transaction amount must be a number.');
                }

                if (!('description' in value)) {
                    throw new Error('Transaction description is required.');
                } else if (typeof value.description !== 'string' || !value.description.trim()) {
                    throw new Error('Transaction description must be a non-empty string.');
                }
            }
            return true;
        }),
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

module.exports = { validateBudget, validateUpdateBudget }