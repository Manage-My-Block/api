const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../../middleware/authentication')
const { authoriseCommitteeAdmin, authoriseAdmin } = require('../../middleware/authorisation')
const { validateBudget, validateUpdateBudget } = require('../../middleware/budgetValidation')
const BudgetsController = require('./budgetController');
const { validateId } = require('../../middleware/validateID')

// Get budget by ID
router.get('/budgets', authenticateUser, BudgetsController.getBudgets);

// Get budget by ID
router.get('/budgets/:id', authenticateUser, validateId, BudgetsController.getBudgetById);

// Get budget by Building ID
router.get('/budgets/building/:id', authenticateUser, validateId, BudgetsController.getBudgetByBuilding);

// Create a new budget
router.post('/budgets', authenticateUser, validateBudget, BudgetsController.createBudget);

// // Update a budget by ID
router.put('/budgets/:id', authenticateUser, validateId, validateUpdateBudget, BudgetsController.updateBudget);

// Delete a budget by ID
router.delete('/budgets/:id', authenticateUser, validateId, BudgetsController.deleteBudget);

module.exports = router;