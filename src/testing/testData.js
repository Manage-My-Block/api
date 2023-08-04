const newUserData = {
    email: 'john@email.com',
    password: 'password123',
    apartment: 123,
    name: 'John Doe'
}

const incompleteUserData = {
    password: 'password123',
    name: 'John Doe'
}

const badUserData = {
    email: 'john',
    password: '  ',
    apartment: "123",
    name: '   '
}

const updatedUserData = {
    email: 'new@email.com',
    password: 'newpass123',
    name: 'Jane Doe'
}


const newTodoData = {
    title: 'Broken front door',
    description: 'The north building front door handle is broken',
    dueDate: new Date('2024-07-15'),
    isComplete: false,
    needsVote: false,
    status: "pending",
    cost: 0
}

const badTodoData = {
    title: '   ',
    description: 1,
    dueDate: "new date",
    isComplete: 10,
    cost: 0.1
}

const incompleteTodoData = {
    title: 'Broken front door',
}

const updatedTodoData = {
    title: 'Broken back door',
    description: 'The south building front door handle is broken',
    status: "started",
    cost: 10
}



const newNoticeData = {
    title: 'Block party',
    description: 'Anyone keen on throwing a block party?'
}

const incompleteNoticeData = {
}

const badNoticeData = {
    title: '   ',
    description: '   '
}

const updatedNoticeData = {
    title: 'BBQ party',
    description: 'Anyone keen on throwing a BBQ party?'
}


const newContactData = {
    name: "John's Plumbing",
    phoneNumber: "0398731567",
    email: 'john@email.com',
    occupation: "plumber"
}

const incompleteContactData = {
    name: "Fred's Plumbing",
}

const badContactData = {
    name: "   ",
    phoneNumber: 2,
    email: 1,
}

const updatedContactData = {
    name: "Freds's Plumbing",
    phoneNumber: "0392611567",
    email: 'fredn@email.com',
    occupation: "electrician"
}


const newBudgetData = {
    name: "Owners Corp 1 Budget",
    balance: 1000000,
}

const incompleteBudgetData = {
    name: "Test budget",
}

const badBudgetData = {
    name: "   ",
    balance: "1000000",
    transactions: {}
}

const updatedBudgetData = {
    name: "Owners Corp 2 Budget",
}


let URL = ""
switch (process.env.NODE_ENV) {
    case "production":
        URL = process.env.PROD_URL
        break;
    case "development":
        URL = process.env.DEV_URL
        break;
    case "test":
        URL = "mongodb://localhost:27017/test_db"
        break;
    default:
        console.log("Missing db URL")
}



module.exports = {
    URL,
    newUserData,
    incompleteUserData,
    badUserData,
    updatedUserData,
    newTodoData,
    badTodoData,
    incompleteTodoData,
    updatedTodoData,
    newNoticeData,
    badNoticeData,
    incompleteNoticeData,
    updatedNoticeData,
    newContactData,
    incompleteContactData,
    badContactData,
    updatedContactData,
    newBudgetData,
    incompleteBudgetData,
    badBudgetData,
    updatedBudgetData,
}