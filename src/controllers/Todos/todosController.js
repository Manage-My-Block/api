const Todo = require('../../models/Todo')

// Create a todo
exports.createTodo = async (req, res) => {
    try {

        const newTodo = await Todo.createTodo(req.body);
        res.status(201).json(newTodo);

    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

// Get all todos
exports.getAllTodos = async (req, res) => {
    try {

        const todos = await Todo.find();
        res.json(todos);

    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

// Get a todo by ID
exports.getTodoById = async (req, res) => {
    try {

        const todo = await Todo.getTodoById(req.params.id);
        res.json(todo);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};

// Update a todo by ID
exports.updateTodo = async (req, res) => {
    try {

        const updatedTodo = await Todo.updateTodo(req.params.id, req.body);
        res.json(updatedTodo);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};

// Add a comment to a todo
exports.addCommentTodo = async (req, res) => {
    try {

        const updatedTodo = await Todo.addComment(req.params.id, req.body);

        res.json(updatedTodo);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};

// Remove a comment from a todo
exports.removeCommentTodo = async (req, res) => {
    try {

        const updatedTodo = await Todo.removeComment(req.params.id, req.params.commentId, req.user._id);

        res.json(updatedTodo);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};

// Delete a todo by ID
exports.deleteTodo = async (req, res) => {
    try {

        const deletedTodo = await Todo.deleteTodo(req.params.id);
        res.json(deletedTodo);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};
