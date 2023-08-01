const { validationResult, body, check, param } = require('express-validator');

function padStringWithRandomNumbers(str) {
    if (str.length >= 8) {
        return str; // If the string is already 8 characters or more, return it as is
    }

    // Generate a random number between 0 and 999999 (6 digits)
    function generateRandomNumber() {
        return Math.floor(Math.random() * 1000000);
    }

    while (str.length < 8) {
        const randomNumber = generateRandomNumber().toString();
        str += randomNumber;
    }

    // Trim the string to a maximum length of 10 characters
    return "03" + str.slice(0, 8);
}


// Validate contact creation data
const validateNewContact = [
    // Validate email
    body('email')
        .optional()
        .isEmail()
        .withMessage('Invalid email format'),
    // Validate phone number
    body('phoneNumber')
        .trim()
        .notEmpty()
        .withMessage('Phone number is required')
        .customSanitizer((value) => {

            // If value is length 8, add a fake location code (03 for Vic) to the start
            if (value.length === 8) {
                value = "03" + value
            } else if (value.length < 8) { // If less than 8 then randomise some numbers to fill it out
                value = padStringWithRandomNumbers(value)
            }

            // Make the string formatted like XX-XXXX-XXXX
            return value.slice(0, 2) + "-" + value.slice(2, 6) + "-" + value.slice(6);

        }),
    // Validate name
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required'),
    body('occupation')
        .trim()
        .notEmpty()
        .withMessage('Occupation is required'),
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

// Validate contact update data
const validateUpdateContact = [
    check('*')
        .notEmpty()
        .withMessage('Must update at least one field'),
    param('id')
        .isMongoId()
        .withMessage('Invalid contact ID'),
    body('email')
        .optional()
        .isEmail()
        .withMessage('Invalid email format'),
    body('phoneNumber')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Phone number is required')
        .isLength({ min: 8, max: 10 })
        .withMessage('Phone number must be 8 - 10 numbers long')
        .customSanitizer((value) => {

            if (value.length <= 8) {
                value = "03" + value
            }

            let cleanedNum = value.replace(/\D[^\.]/g, "");
            return cleanedNum.slice(0, 3) + "-" + cleanedNum.slice(3, 6) + "-" + cleanedNum.slice(6);

        }),
    body('occupation')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Occupation is required'),
    body('name')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Name is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map((error) => error.msg) });
        }
        next();
    }
];

module.exports = { validateNewContact, validateUpdateContact }