const { validationResult, body, check, param } = require('express-validator');
const Budget = require('../models/Budget');
const Building = require('../models/Building');

// Validate contact creation data
const validateBudget = [
    // Validate email
    body('balance')
        .optional()
        .isNumeric()
        .withMessage('Balance must be numeric'),
    body('building')
        .isMongoId()
        .withMessage('Invalid building ID')
        .custom(async () => {
            // Search for building based on building field
            const building = await Building.findById(value);

            // If building doesn't exists then throw error
            if (!building) {
                throw new Error('Building not registered');
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

module.exports = { validateBudget }