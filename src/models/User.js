const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const Role = require('./Role')

// Define the User schema
const userSchema = new mongoose.Schema({
    username: {
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
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        // default: function () {
        //     const defaultRole = Role.findOne({ name: 'User' }).exec();
        //     return defaultRole.then((role) => role ? role._id : null);
        // }
    }
});

// Instance methods for User schema
userSchema.methods = {
    // Method to compare the provided password with the stored hashed password
    comparePassword: async function (password) {
        try {
            return await bcrypt.compare(password, this.password);
        } catch (err) {
            throw new Error(err);
        }
    }
};

// Static methods to keep CRUD functionality contained
userSchema.statics = {
    createUser: async function (userData) {
        try {
            const user = new this(userData);
            await user.save();
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getUserById: async function (userId) {
        try {
            const user = await this.findById(userId).populate('role');
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    updateUser: async function (userId, updateData) {
        try {
            const user = await this.findByIdAndUpdate(userId, updateData, { new: true });
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    deleteUser: async function (userId) {
        try {
            const user = await this.findByIdAndDelete(userId);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

// Pre-save middleware to hash the password before saving a User
userSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        }
        next();
    } catch (err) {
        next(err);
    }
});


// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;