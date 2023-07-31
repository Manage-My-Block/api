const mongoose = require('mongoose')

const budgetSchema = mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    balance: {
        type: Number,
        required: true
    },
    building: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Building',
        required: true,
        autopopulate: { select: '_id' }
    },
    transactions: [
        {
            amount: {
                type: Number,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            // description: {
            //     type: mongoose.Schema.Types.ObjectId,
            //     ref: 'Todo',
            //     required: true,
            //     autopopulate: { select: 'title' }
            // },
            date: {
                type: Date,
                default: Date.now,
            },
            tally: {
                type: Number,
            },
            todo: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Todo',
                required: false,
                // autopopulate: { select: '_id' }
            }
        }
    ],
})

// Enable library plugin to automatically populate ref fields
budgetSchema.plugin(require('mongoose-autopopulate'));

// Create a new budget
budgetSchema.statics.createBudget = async function (budgetData) {
    try {
        // Convert balance from dollars to cents so can store value as whole number
        // budgetData.balance *= 100

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
budgetSchema.statics.updateBudget = async function (budgetId, updatedBudgetData) {
    try {

        // Find the budget
        const budget = await this.findById(budgetId)

        // if no budget found throw error
        if (!budget) {
            throw new Error('budget not found');
        }

        let cleanedUpdatedData = {}

        if (updatedBudgetData.transaction) {

            // Add the running tally to the transaction
            updatedBudgetData.transaction.tally = (budget.balance) - (updatedBudgetData.transaction.amount)

            // Update the balance from the transaction amount and push new transaction to array
            cleanedUpdatedData.balance = (budget.balance) - (updatedBudgetData.transaction.amount)
            cleanedUpdatedData.transactions = [...budget.transactions, updatedBudgetData.transaction]
        }

        // Add name to updated budget
        if (updatedBudgetData.name) {
            cleanedUpdatedData.name = updatedBudgetData.name
        }

        // Save the updated budget
        const updatedBudget = await this.findByIdAndUpdate(budgetId, cleanedUpdatedData, { new: true })

        return updatedBudget;

    } catch (error) {

        throw new Error(error.message);

    }
};

// Remove transaction from budget (when Todo is re-opened)
budgetSchema.statics.removeTransaction = async function (budgetId, todoId) {
    try {

        // Find the budget
        const budget = await this.findById(budgetId)

        // if no budget found throw error
        if (!budget) {
            throw new Error('budget not found')
        }

        // Find transaction
        const transaction = budget.transactions.find(transaction => transaction.todo.toString() === todoId)

        // if no transaction found throw error
        if (!transaction) {
            throw new Error('Transaction not found')
        }

        // Filter out the transaction from array of transactions
        budget.transactions = budget.transactions.filter(transaction => transaction.todo.toString() !== todoId)

        // Add the transaction amount back to the balance
        budget.balance += transaction.amount

        // Save the updated budget
        const updatedBudget = await this.findByIdAndUpdate(budgetId, budget, { new: true })

        return updatedBudget;

    } catch (error) {
        console.log(error)
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