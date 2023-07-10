const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { encrypt } = require('../../utils/encryption')
const User = require('../../models/User');
const dotenv = require('dotenv')

// Configure environment
dotenv.config()

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });

        // If the user doesn't exist, return an error
        if (!user) {
            return res.status(404).json({ error: 'Invalid username or password' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // If the password is invalid, return an error
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ payload: encrypt(user._id) }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });

        // Return the token as a response
        res.json({ token });

    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

exports.register = async (req, res) => {
    try {
        // Create a new user
        const newUser = await User.createUser(req.body);

        // Generate a JWT based on user ID
        const token = jwt.sign({ payload: encrypt(newUser._id) }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });

        // Return user info and JWT
        res.status(201).json({ newUser, token });

    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};
