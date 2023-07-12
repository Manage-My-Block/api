const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        autopopulate: { select: 'name' }
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
    votes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
                autopopulate: { select: 'name' }
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
                autopopulate: { select: 'name' }
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
        min: [0, 'Cannot have negative numbers'],
        default: 0,
        validate: {
            validator: Number.isInteger,
            message: 'Cost must be a whole number in cents.'
        }
    },
    building: {
        type: String,
        required: true
    },
    // building: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Building',
    //     required: true,
    //     autopopulate: { select: 'name' }
    // },
});

// Enable library plugin to automatically populate ref fields
todoSchema.plugin(require('mongoose-autopopulate'));

// Create a new todo
todoSchema.statics.createTodo = async function (todoData) {
    try {
        // Create a new todo instance
        const todo = new this(todoData)

        // Save todo in database
        await todo.save()

        return todo

    } catch (error) {

        throw new Error(error.message)

    }
}

// Read a todo by ID
todoSchema.statics.getTodoById = async function (todoId) {
    try {
        // Search for todo
        const todo = await this.findById(todoId)

        // If todo not found throw error
        if (!todo) {
            throw new Error('Todo not found')
        }

        return todo

    } catch (error) {

        throw new Error(error.message)

    }
}

// Update a todo by ID
todoSchema.statics.updateTodo = async function (todoId, updateData) {
    try {
        // Search for todo and update with data
        const todo = await this.findByIdAndUpdate(todoId, updateData, { new: true })

        // If todo not found throw error
        if (!todo) {
            throw new Error('Todo not found')
        }

        return todo

    } catch (error) {

        throw new Error(error.message)

    }
}

// Call a vote for a Todo
todoSchema.statics.callVote = async function (todoId, role) {
    try {
        // Search for todo
        const todo = await this.findById(todoId)

        // If todo not found throw error
        if (!todo) {
            throw new Error('Todo not found')
        }

        // Check if needsVote is already true and return unchanged todo
        if (todo.needsVote) {
            return todo
        }

        // Update the needsVote field to true
        todo.needsVote = true

        // Update todo record
        const updatedTodo = await this.findByIdAndUpdate(todoId, todo, { new: true })

        return updatedTodo;

    } catch (error) {

        throw new Error(error.message);

    }
};

// Cast a vote for a Todo
todoSchema.statics.castVote = async function (todoId, voteData) {
    try {
        // Search for todo
        const todo = await this.findById(todoId)

        // If todo not found throw error
        if (!todo) {
            throw new Error('Todo not found')
        }

        // Search for vote owned by user, convert ObjectId to string to compare
        const foundVote = todo.votes.find(vote => vote.user._id.toString() === voteData.user.toString())

        // If vote exists update the ballot
        if (foundVote) {

            // Loop over votes array
            todo.votes = todo.votes.map(vote => {
                // Find vote owned by user
                if (vote.user._id.toString() === voteData.user.toString()) {
                    // Update their ballot
                    vote.ballot = voteData.ballot

                    // Return updated ballot to votes array
                    return vote
                } else {

                    // If not their ballot then don't change it
                    return vote
                }
            })

        } else {
            // If user hasn't cast a vote then push their new vote to the votes array
            todo.votes.push(voteData)
        }

        // Update the full todo with the new votes array data
        const updatedTodo = await this.findByIdAndUpdate(todoId, todo, { new: true })

        return updatedTodo;

    } catch (error) {

        throw new Error(error.message);

    }
};

// Add a comment to a Todo
todoSchema.statics.addComment = async function (todoId, newComment) {
    try {
        // Search for todo
        const todo = await this.findById(todoId)

        // If todo not found throw error
        if (!todo) {
            throw new Error('Todo not found')
        }

        // Push the new comment to the comments array
        // todo.comments = [...todo.comments, newComment]
        todo.comments.push(newComment)

        // Update full todo with new comments array
        const updatedTodo = await this.findByIdAndUpdate(todoId, todo, { new: true })

        return updatedTodo;

    } catch (error) {

        throw new Error(error.message);

    }
};

// Remove a comment from a Todo
todoSchema.statics.removeComment = async function (todoId, commentId, userId) {
    try {

        // Find todo
        const todo = await this.findById(todoId)

        // If todo not found throw error
        if (!todo) {
            throw new Error('Todo not found');
        }

        // Find comment in todo, convert ObjectId to string to compare
        const foundComment = todo.comments.find(comment => comment._id.toString() === commentId)

        // If not found throw error
        if (!foundComment) {
            throw new Error('Comment not found');
        }

        // Users can only delete their own todo comments
        if (foundComment.user._id.toString() !== userId.toString()) {
            throw new Error('Can only delete your own comments');
        }

        // Filter the comment out
        todo.comments = todo.comments.filter(comment => comment._id.toString() !== commentId)

        // Save full updated todo with filtered comments array
        const updatedTodo = await this.findByIdAndUpdate(todoId, todo, { new: true })

        return updatedTodo;

    } catch (error) {

        throw new Error(error.message);

    }
};

// Delete a todo by ID
todoSchema.statics.deleteTodo = async function (todoId) {
    try {
        // Find and delete todo
        const todo = await this.findByIdAndDelete(todoId);

        // If todo not found throw error
        if (!todo) {
            throw new Error('Todo not found');
        }

        return todo;

    } catch (error) {

        throw new Error(error.message);

    }
};

// Create the todo model
const Todo = mongoose.model('todo', todoSchema);

module.exports = Todo;
