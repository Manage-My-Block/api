const Todo = require('../../models/Todo')
const Budget = require('../../models/Budget')

// Create a todo
const createTodo = async (req, res) => {
    try {
        // Create todo using Todo static method
        const newTodo = await Todo.createTodo(req.body);

        res.status(201).json(newTodo);

    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

// Get all todos
const getAllTodos = async (req, res) => {
    try {
        // Find all todos
        const todos = await Todo.find()

        res.json(todos);

    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

// Get a todo by ID
const getTodoById = async (req, res) => {
    try {
        // Get a single using Todo static method
        const todo = await Todo.getTodoById(req.params.id);

        res.json(todo);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};

// Update a todo by ID
const updateTodo = async (req, res) => {
    try {
        // Updated a todo using Todo static method
        const updatedTodo = await Todo.updateTodo(req.params.id, req.body);

        res.json(updatedTodo);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};

// Update a todo by ID
const finaliseTodo = async (req, res) => {
    try {
        // Updated a todo using Todo static method
        const updatedTodo = await Todo.updateTodo(req.params.id, req.body);

        const newTransaction = {
            amount: req.body.cost,
            description: updatedTodo._id
        }

        const budget = await Budget.find({ building: req.body.building })

        // If todo not found throw error
        if (!budget) {
            throw new Error('Budget not found');
        }

        const updatedBudget = await budget.addTransaction(newTransaction)

        res.json(updatedBudget);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};

// Call a vote on a todo
const callVoteTodo = async (req, res) => {
    try {
        // Call vote on Todo using static method
        const updatedTodo = await Todo.callVote(req.params.id, req.user.role.role);

        res.json(updatedTodo);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};

// Cast a vote on a todo
const castVoteTodo = async (req, res) => {
    try {
        // Cast vote on Todo using static method
        const updatedTodo = await Todo.castVote(req.params.id, req.body);

        res.json(updatedTodo);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};

// Add a comment to a todo
const addCommentTodo = async (req, res) => {
    try {
        // Add comment to Todo using static method
        const updatedTodo = await Todo.addComment(req.params.id, req.body);

        res.json(updatedTodo);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};

// Remove a comment from a todo
const removeCommentTodo = async (req, res) => {
    try {
        // Remove comment from Todo using static method
        const updatedTodo = await Todo.removeComment(req.params.id, req.params.commentId, req.user._id);

        res.json(updatedTodo);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};

// Delete a todo by ID
const deleteTodo = async (req, res) => {
    try {

        const deletedTodo = await Todo.deleteTodo(req.params.id);

        res.json(deletedTodo);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};

module.exports = {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodo,
    castVoteTodo,
    addCommentTodo,
    removeCommentTodo,
    deleteTodo,
    callVoteTodo,
    finaliseTodo
}