const express = require('express');
const router = express.Router();
const { validateCreateTodo, validateUpdateTodo, validateVoteTodo } = require('../../middleware/todoValidation')
const { validateComment } = require('../../middleware/commentValidation')
const { validateId } = require('../../middleware/validateID')
const { authenticateUser } = require('../../middleware/authentication')
const { authoriseCommittee } = require('../../middleware/authorisation')
const TodosController = require('./todosController');

// Get all todos
router.get('/todos', authenticateUser, TodosController.getAllTodos);

// Get todo by ID
router.get('/todos/:id', authenticateUser, TodosController.getTodoById);

// Create a new todo
router.post('/todos', authenticateUser, authoriseCommittee, validateCreateTodo, TodosController.createTodo);

// Update a todo by ID
router.put('/todos/:id', authenticateUser, authoriseCommittee, validateUpdateTodo, TodosController.updateTodo);

// Case a vote in a todo by ID
router.put('/todos/:id/vote', authenticateUser, authoriseCommittee, validateVoteTodo, TodosController.castVoteTodo);

// Add a comment to a todo
router.put('/todos/:id/comment', authenticateUser, authoriseCommittee, validateComment, TodosController.addCommentTodo);

// Remove a comment from a todo
router.put('/todos/:id/comment/:commentId', authenticateUser, authoriseCommittee, validateComment, TodosController.removeCommentTodo);

// Delete a todo by ID
router.delete('/todos/:id', authenticateUser, authoriseCommittee, validateId, TodosController.deleteTodo);

module.exports = router;