const User = require('../../models/User');

// Login route
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        // If the user doesn't exist, return an error
        if (!user) {
            return res.status(404).json({ error: 'Invalid email or password' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await user.comparePassword(password);

        // If the password is invalid, return an error
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate a JWT with User method
        const token = user.createJWT()

        // Return the token as a response
        res.json({ user, token });

    } catch (error) {

        res.status(500).json({ error: error.message });
    }
}

const register = async (req, res) => {
    try {

        // Create a new user
        const newUser = await User.createUser(req.body);

        // Generate a JWT with User method
        const token = newUser.createJWT()

        // Return user info and JWT
        res.status(201).json({ newUser, token });

    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

module.exports = { login, register }