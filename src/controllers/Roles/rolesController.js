const Role = require('../../models/Role')

const getRoles = async (req, res) => {
    try {

        const roles = await Role.find();

        res.status(200).json(roles);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }
};

module.exports = { getRoles }