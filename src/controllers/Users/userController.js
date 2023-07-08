const User = require('../../models/User');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const newUser = new User({ username, password, email });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all users
exports.getUsers = async (req, res) => {
    console.log("get users")
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
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password, email } = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, { username, password, email }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// const express = require('express')
// const User = require('../models/User');

// // Create a new user
// const createUser = async (req, res) => {
//     try {
//         const { username, password, email } = req.body;
//         const newUser = new User({ username, password, email });
//         await newUser.save();
//         res.status(201).json({ message: 'User created successfully', user: newUser });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Get all users
// const getUsers = async (req, res) => {
//     try {
//         const users = await User.find();
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Get a specific user by ID
// const getUserById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const user = await User.findById(id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Update a user by ID
// const updateUser = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { username, password, email } = req.body;

//         const updatedUser = await User.findByIdAndUpdate(id, { username, password, email }, { new: true });

//         if (!updatedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.status(200).json({ message: 'User updated successfully', user: updatedUser });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Delete a user by ID
// const deleteUser = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deletedUser = await User.findByIdAndDelete(id);
//         if (!deletedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


// module.exports = {
//     createUser,
//     getUsers,
//     getUserById,
//     updateUser,
//     deleteUser

// }