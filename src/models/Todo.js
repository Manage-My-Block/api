const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isComplete: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    dueDate: {
        type: Date
    },
    needsVote: {
        type: Boolean,
        default: false,
    },
    vote: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            ballot: {
                type: Boolean,
                required: true,
            },
        },
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    images: [String],
    cost: {
        type: Number,
        default: 0,
    },
});


// Create a new todo
todoSchema.statics.createTodo = async function (todoData) {
    try {
        const todo = new this(todoData);
        await todo.save();
        return todo;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Read a todo by ID
todoSchema.statics.getTodoById = async function (todoId) {
    try {
        const todo = await this.findById(todoId)
            .populate('author', 'name')
            .populate('vote.user', 'name')
            .populate('comments.user', 'name');
        if (!todo) {
            throw new Error('todo not found');
        }
        return todo;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Update a todo by ID
todoSchema.statics.updateTodo = async function (todoId, updateData) {
    try {
        const todo = await this.findByIdAndUpdate(todoId, updateData, { new: true });

        if (!todo) {
            throw new Error('todo not found');
        }

        return todo;

    } catch (error) {

        throw new Error(error.message);

    }
};

// Add a comment to a Todo
todoSchema.statics.addComment = async function (todoId, newComment) {
    try {

        const todo = await this.findById(todoId)

        if (!todo) {
            throw new Error('todo not found');
        }

        todo.comments = [...todo.comments, newComment]

        console.log(todo.comments)

        return todo;

    } catch (error) {

        throw new Error(error.message);

    }
};

// Remove a comment from a Todo
todoSchema.statics.removeComment = async function (todoId, commentId) {
    try {

        const todo = await this.findById(todoId)


        if (!todo) {
            throw new Error('todo not found');
        }

        todo.comments = todo.comments.filter(comment => comment._id !== commentId)

        return todo;

    } catch (error) {

        throw new Error(error.message);

    }
};

// Delete a todo by ID
todoSchema.statics.deleteTodo = async function (todoId) {
    try {
        const todo = await this.findByIdAndDelete(todoId);
        if (!todo) {
            throw new Error('todo not found');
        }
        return todo;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Create the todo model
const Todo = mongoose.model('todo', todoSchema);

module.exports = Todo;
