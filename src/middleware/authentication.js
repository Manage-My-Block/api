const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Authentication middleware
module.exports.authenticateUser = async (req, res, next) => {
    try {
        // Extract the token from the Authorization header
        const token = req.headers.authorization.split(' ')[1];

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Retrieve the user based on the decoded token
        const user = await User.findById(decodedToken.userId);

        // Check if the user exists
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Attach the user object to the request for further use
        req.user = user;

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
    }
};
