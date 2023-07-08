const express = require('express');
const Role = require('../../models/Role')

exports.getRoles = async (req, res) => {
    console.log("get users")
    try {
        const roles = await Role.find();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};