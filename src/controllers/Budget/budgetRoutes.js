const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../../middleware/authentication')
const { authoriseCommitteeAdmin, authoriseAdmin } = require('../../middleware/authorisation')
const { validateBudget } = require('../../middleware/budgetValidation')
const BudgetsController = require('./budgetController');
const { validateId } = require('../../middleware/validateID')

// Get budget by ID
router.get('/budgets/:id', authenticateUser, validateId, BudgetsController.getBudgetById);

// // Create a new budget
// router.post('/budgets', authenticateUser, authoriseAdmin, validateBudget, BudgetsController.createBudget);

// // Update a budget by ID
router.put('/budgets/:id', authenticateUser, authoriseAdmin, validateId, BudgetsController.updateBudget);

// Delete a budget by ID
// router.delete('/budgets/:id', authenticateUser, authoriseAdmin, validateId, BudgetsController.deleteBudget);

module.exports = router;