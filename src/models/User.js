const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

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