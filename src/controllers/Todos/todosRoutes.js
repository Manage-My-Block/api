const express = require('express');
const router = express.Router();
const { validateCreateTodo, validateUpdateTodo, validateVoteTodo } = require('../../middleware/todoValidation')
const { validateComment } = require('../../middleware/commentValidation')
const { validateId } = require('../../middleware/validateID')
const { authenticateUser } = require('../../middleware/authentication')
const { authoriseCommitteeAdmin, authoriseCommittee } = require('../../middleware/authorisation')
const TodosController = require('./todosController');

// Get all todos
router.get('/todos', authenticateUser, TodosController.getAllTodos);

// Get todo by ID
router.get('/todos/:id', authenticateUser, TodosController.getTodoById);

// Create a new todo
router.post('/todos', authenticateUser, authoriseCommitteeAdmin, validateCreateTodo, TodosController.createTodo);

// Update a todo by ID
router.put('/todos/:id', authenticateUser, authoriseCommitteeAdmin, validateUpdateTodo, TodosController.updateTodo);

// Call a vote in a todo by ID
router.put('/todos/:id/callvote', authenticateUser, authoriseCommitteeAdmin, TodosController.callVoteTodo);

// Cast a vote in a todo by ID
router.put('/todos/:id/vote', authenticateUser, authoriseCommitteeAdmin, validateVoteTodo, TodosController.castVoteTodo);

// Add a comment to a todo
router.put('/todos/:id/comment', authenticateUser, authoriseCommitteeAdmin, validateComment, TodosController.addCommentTodo);

// Remove a comment from a todo
router.put('/todos/:id/comment/:commentId', authenticateUser, authoriseCommitteeAdmin, validateComment, TodosController.removeCommentTodo);

// Finalise a todo
router.put('/todos/:id/finalise', authenticateUser, authoriseCommitteeAdmin, TodosController.finaliseTodo);

// Delete a todo by ID
router.delete('/todos/:id', authenticateUser, authoriseCommitteeAdmin, validateId, TodosController.deleteTodo);

module.exports = router;