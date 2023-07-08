const express = require('express');
const router = express.Router();
const RoleController = require('./rolesController');

// Get all roles
router.get('/roles', RoleController.getRoles);

module.exports = router;