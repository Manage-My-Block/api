const mongoose = require('mongoose')

const budgetSchema = mongoose.Schema({
    transactions: [
        {
            amount: {
                type: Number,
                required: true,
            },
            description: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Todo',
                required: true,
                autopopulate: { select: 'title' }
            },
            date: {
                type: Date,
                default: Date.now,
            },
        }
    ],
    // building: {
    //     type: String,
    //     required: true
    // },
    building: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Building',
        required: true,
        autopopulate: { select: 'name' }
    },
    name: {
        type: String,
        required: true

    },
    balance: {
        type: Number,
        required: true
    },
})

// Enable library plugin to automatically populate ref fields
budgetSchema.plugin(require('mongoose-autopopulate'));

// Instance methods for Budget schema
budgetSchema.methods = {
    // Method to add a new transaction to the budget and update the balance
    addTransaction: async function (newTransaction) {
        try {

            this.balance -= newTransaction.amount
            this.transactions.push(newTransaction)

            // Save the updated budget
            const updatedBudget = await this.constructor(this._id, this, { new: true })

            return updatedBudget;

        } catch (err) {
            throw new Error(err);
        }
    }
};

// Create a new budget
budgetSchema.statics.createBudget = async function (budgetData) {
    try {
        // Create a new instance of a budget record
        const budget = new this(budgetData);

        // Save the record
        await budget.save();

        return budget;

    } catch (error) {

        throw new Error(error.message);

    }
};

// Read a budget by ID
budgetSchema.statics.getBudgetById = async function (budgetId) {
    try {
        // Find the record, populate the references fields
        const budget = await this.findById(budgetId)

        // if no budget found throw error
        if (!budget) {
            throw new Error('budget not found');
        }

        return budget;

    } catch (error) {

        throw new Error(error.message);

    }
};

// Update a budget by ID
budgetSchema.statics.updateBudget = async function (budgetId, newTransaction) {
    try {

        // Find the budget
        const budget = await this.findById(budgetId)

        // if no budget found throw error
        if (!budget) {
            throw new Error('budget not found');
        }

        // Update the balance and push new transaction to array
        budget.balance -= newTransaction.amount
        budget.transactions.push(newTransaction)

        // Save the updated budget
        const updatedBudget = await this.findByIdAndUpdate(todoId, budget, { new: true })

        return updatedBudget;

    } catch (error) {

        throw new Error(error.message);

    }
};

// Delete a budget by ID
budgetSchema.statics.deleteBudget = async function (budgetId) {
    try {
        // Find and delete Budget
        const budget = await this.findByIdAndDelete(budgetId);

        // If budget not found throw error
        if (!budget) {
            throw new Error('budget not found');
        }

        return budget;

    } catch (error) {

        throw new Error(error.message);

    }
};


const Budget = mongoose.model('budget', budgetSchema)

module.exports = Budget