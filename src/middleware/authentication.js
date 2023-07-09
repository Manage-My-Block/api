const { encrypt, decrypt } = require('../utils/encryption')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Authentication middleware
const authenticateUser = async (req, res, next) => {
    try {
        // Extract the token from the Authorisation header
        const token = req.headers.authorization.split(' ')[1];

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Decode retrieved data
        const decodedPayload = new mongoose.Types.ObjectId(decrypt(decodedToken.payload))

        // Retrieve the user based on the decoded token
        const user = await User.findById(decodedPayload);

        // Check if the user exists
        if (!user) {
            throw new Error("Can't find user")
            // return res.status(401).json({ error: 'Unauthorised' });
        }

        // Attach the user object to the request for further use
        req.user = user;

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorised' });
    }
};

module.exports = { authenticateUser }