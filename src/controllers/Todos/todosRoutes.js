const express = require('express');
const router = express.Router();
const { validateCreateTodo, validateUpdateTodo } = require('../../middleware/todoValidation')
const { authenticateUser } = require('../../middleware/authentication')
const TodosController = require('./todosController');

// Get all todos
router.get('/todos', authenticateUser, TodosController.getAllTodos);

// Get todo by ID
router.get('/todos/:id', authenticateUser, TodosController.getTodoById);

// Create a new todo
router.post('/todos', authenticateUser, validateCreateTodo, TodosController.createTodo);

// Update a todo by ID
router.put('/todos/:id', authenticateUser, validateUpdateTodo, TodosController.updateTodo);

// Delete a todo by ID
router.delete('/todos/:id', authenticateUser, TodosController.deleteTodo);

module.exports = router;