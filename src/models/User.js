const mongoose = require('mongoose')
const Role = require('./Role')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { encrypt } = require('../utils/encryption')
const dotenv = require('dotenv')

// Configure environment
dotenv.config()

// Define the User schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    apartment: {
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        autopopulate: { select: 'role' }
    },
    building: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Building',
        required: true,
        autopopulate: { select: 'name' }
    },
    // building: {
    //     type: String,
    //     required: true
    // },
});

// Enable library plugin to automatically populate ref fields
userSchema.plugin(require('mongoose-autopopulate'));

// Pre-save hook to run before a User.save() call
userSchema.pre('save', async function (next) {
    try {
        if (!this.role) {

            // userRole = await Role.findOne({ role: 'user' });

            userRole = await Role.findOne({ role: 'admin' });

            if (!userRole) {
                throw new Error("Can't find role");
            }

            this.role = userRole._id;
        }

        if (this.isModified('password')) {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        }

        next();
    } catch (error) {
        next(error);
    }
});

// Modify how the toJSON function operates on User mongoose object
userSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        // Remove the password and role fields to maintain security
        delete ret.password
        // delete ret.role

        return ret
    }
});

// Instance methods for User schema
userSchema.methods = {
    // Method to compare the provided password with the stored hashed password
    comparePassword: async function (password) {
        try {

            const compare = await bcrypt.compare(password, this.password);

            return compare
        } catch (err) {
            throw new Error(err);
        }
    },
    // Method to create a JWT with user id payload
    createJWT: function () {
        try {
            // Generate a JWT token using the user's id as payload
            const token = jwt.sign({ payload: encrypt(this._id) }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });

            return token

        } catch (err) {
            throw new Error(err);
        }
    }

};

// Static methods to keep CRUD functionality contained
userSchema.statics.createUser = async function (userData) {
    try {
        // Create a new user instance
        const user = new this(userData);

        // Save user in database
        await user.save();

        return user

    } catch (error) {

        throw new Error(error.message);

    }
}

userSchema.statics.getUserById = async function (userId) {
    try {
        // Search for user
        const user = await this.findById(userId)

        // If user not found throw error
        if (!user) {
            throw new Error('User not found');
        }

        return user;

    } catch (error) {

        throw new Error(error.message);

    }
}

userSchema.statics.updateUser = async function (userId, updateData) {
    try {
        // Search for user and update with data
        const user = await this.findByIdAndUpdate(userId, updateData, { new: true });

        // If user not found throw error
        if (!user) {
            throw new Error('User not found');
        }

        return user;

    } catch (error) {

        throw new Error(error.message);

    }
}

userSchema.statics.deleteUser = async function (userId) {
    try {
        // Find and delete user
        const user = await this.findByIdAndDelete(userId);

        // If user not found throw error
        if (!user) {
            throw new Error('User not found');
        }

        return user;

    } catch (error) {

        throw new Error(error.message);

    }
}

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;