const User = require('../../models/User');

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
        // // Only admin can update any user, otherwise users can only update their own data
        // if (req.user.role.role !== 'admin' && req.user._id.toString() !== req.params.id) {
        //     throw new Error('Unauthorized');
        // }

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
        // // Only admin can delete any user, otherwise users can only delete their own data
        // if (req.user.role.role !== 'admin' && req.user._id.toString() !== req.params.id) {
        //     throw new Error('Unauthorized');
        // }

        // Delete User
        const deletedUser = await User.deleteUser(req.params.id);

        // Return deleted user
        res.json(deletedUser);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}