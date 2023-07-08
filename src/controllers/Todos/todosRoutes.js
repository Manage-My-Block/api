const express = require('express');
const router = express.Router();
const { validateCreateTodo, validateUpdateTodo } = require('../../middleware/todoValidation')
const TodosController = require('./todosController');

// Get all todos
router.get('/todos', TodosController.getAllTodos);

// Get todo by ID
router.get('/todos/:id', TodosController.getTodoById);

// Create a new todo
router.post('/todos', validateCreateTodo, TodosController.createTodo);

// Update a todo by ID
router.put('/todos/:id', validateUpdateTodo, TodosController.updateTodo);

// Delete a todo by ID
router.delete('/todos/:id', TodosController.deleteTodo);

module.exports = router;