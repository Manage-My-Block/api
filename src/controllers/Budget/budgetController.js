const Budget = require('../../models/Budget');

// Get all budgets
const getBudgetById = async (req, res) => {
    try {
        // Get all Budgets
        const budgets = await Budget.find();

        // Return list of Budgets
        res.status(200).json(budgets);

    } catch (error) {

        res.status(500).json({ error: error.message });
    }

};

// Create new budget
const createBudget = async (req, res) => {
    try {
        // Create budget
        const budget = await Budget.createBudget(req.body);

        res.status(201).json(budget);

    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

// Update a budget by ID
const updateBudget = async (req, res) => {
    try {
        // Update budget
        const budget = await Budget.updateBudget(req.params.id, req.body);

        // Return updated Budget
        res.json(budget);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};

// Delete a budget by ID
const deleteBudget = async (req, res) => {
    try {
        // Delete Budget
        const budget = await Budget.deleteBudget(req.params.id);

        // Return deleted budget
        res.json(budget);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};

module.exports = {
    createBudget,
    getBudgetById,
    updateBudget,
    deleteBudget
}