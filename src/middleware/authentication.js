const { decrypt } = require('../utils/encryption')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const dotenv = require('dotenv')

dotenv.config()

// Authentication middleware
const authenticateUser = async (req, res, next) => {
    // Quentin authentication workaround - REMOVE IN PRODUCTION
    if (process.env.NO_AUTH) {
        next()

    } else {
        try {
            // Extract the token from the Authorisation header
            const token = req.headers.authorization.split(' ')[1]


            // Verify the token
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

            // Decode retrieved data
            const decodedPayload = new mongoose.Types.ObjectId(decrypt(decodedToken.payload))

            // Retrieve the user based on the decoded token
            const user = await User.findById(decodedPayload)

            // Check if the user exists
            if (!user) {
                throw new Error("Can't find user")
            }

            // Attach the user object to the request for further use
            req.user = user

            // Generate a refreshed token
            const refreshedToken = user.createJWT()

            // Attach the refreshed token to the request for further use
            req.refreshedToken = refreshedToken

            // Continue to the next middleware or route handler
            next()

        } catch (error) {

            res.status(401).json({ error: 'Unauthorised' })
        }
    }
}

module.exports = { authenticateUser }