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
            },
            date: {
                type: Date,
                default: Date.now,
            },
        }
    ],
    balance: {
        type: Number,
        required: true
    },
})

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
        const budget = await this.findById(budgetId).populat('transactions.description', 'title')

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
        const updatedBudget = await this.findByIdAndUpdate(todoId, budget, { new: true }).populate('transactions.description', 'title')

        return updatedBudget;

    } catch (error) {

        throw new Error(error.message);

    }
};

// Delete a budget by ID
budgetSchema.statics.deleteBudget = async function (budgetId) {
    try {

        const budget = await this.findByIdAndDelete(budgetId);

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