const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const { encrypt, decrypt } = require('../../utils/encryption')
const dotenv = require('dotenv')
dotenv.config()


// Create a new user
const createUser = async (req, res) => {
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

// Get all users
const getUsers = async (req, res) => {
    try {
        // Get all Users
        const users = await User.find();

        // Return list of Users
        res.status(200).json(users);
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

// Get a specific user by ID
const getUserById = async (req, res) => {
    try {
        // Get a User by ID
        const user = await User.getUserById(req.params.id);

        // Return User
        res.json(user);
    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};

// Update a user by ID
const updateUser = async (req, res) => {
    try {
        // Update user
        const updatedUser = await User.updateUser(req.params.id, req.body);

        // Return updated User
        res.json(updatedUser);
    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
    try {
        // Delete User
        const deletedUser = await User.deleteUser(req.params.id);

        // Return deleted user
        res.json(deletedUser);
    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};

module.exports = {
    createUser, getUsers, getUserById, updateUser, deleteUser
}