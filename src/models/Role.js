const mongoose = require('mongoose')

const Role = mongoose.model('role', {
    role: String
})

module.exports = Role