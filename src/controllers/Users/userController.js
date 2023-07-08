const User = require('../../models/User');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const newUser = await User.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.getUserById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.updateUser(req.params.id, req.body);
        res.json(updatedUser);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.deleteUser(req.params.id);
        res.json(deletedUser);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};