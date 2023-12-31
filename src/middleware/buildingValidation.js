const { validationResult, body, check, param } = require('express-validator');
const User = require('../models/User');
const Building = require('../models/Building');

// Validate user input
const validateNewBuilding = [
    body('buildingData.name')
        .trim()
        .notEmpty()
        .withMessage('Building name is required'),
    body('buildingData.apartmentCount')
        .isNumeric()
        .withMessage('Apartment count must be a number'),
    body('buildingData.address')
        .trim()
        .notEmpty()
        .withMessage('Building address is required')
        .custom(async (value) => {
            // Search for user based on email field
            const building = await Building.findOne({ address: value });

            // If user exists then email is already is use
            if (building) {
                throw new Error('Building address is already registered');
            }

            return true;
        }),
    // Validate email
    body('userData.email')
        .notEmpty()
        .withMessage('User email is required')
        .isEmail()
        .withMessage('Invalid email format')
        .custom(async (value) => {

            const user = await User.findOne({ email: value });

            if (user) {
                throw new Error('User email is already registered');
            }
            return true;
        }),
    // Validate password
    body('userData.password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    (req, res, next) => {

        // Check for errors
        const errors = validationResult(req);

        // If errors return an error response
        if (!errors.isEmpty()) {
            console.log(errors)
            return res.status(400).json({ errors: errors.array().map((error) => error.msg) });
        }
        // Call next middleware
        next();
    }
];

// Validate user input
const validateUpdatedBuilding = [
    param('id')
        .isMongoId()
        .withMessage('Invalid user ID'),
    check('*')
        .notEmpty()
        .withMessage('Must update at least one field'),
    body('name')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Building name is required'),
    body('apartmentCount')
        .optional()
        .isNumeric()
        .withMessage('Apartment count must be a number'),
    body('address')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Building address is required')
        .custom(async (value) => {
            // Search for user based on email field
            const building = await Building.findOne({ address: value });

            // If user exists then email is already is use
            if (building) {
                throw new Error('Building address is already registered');
            }

            return true;
        }),
    (req, res, next) => {

        // Check for errors
        const errors = validationResult(req);

        // If errors return an error response
        if (!errors.isEmpty()) {
            console.log(errors)
            return res.status(400).json({ errors: errors.array().map((error) => error.msg) });
        }
        // Call next middleware
        next();
    }
];


module.exports = { validateNewBuilding, validateUpdatedBuilding }