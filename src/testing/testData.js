const newUserData = {
    username: 'john@email.com',
    password: 'password123',
    apartment: 123,
    name: 'John Doe'
}

const user2 = {
    username: 'jane@email.com',
    password: 'password456',
    apartment: 456,
    name: 'Jane Smith',
}

const user3 = {
    username: 'beth@email.com',
    password: 'password789',
    apartment: 789,
    name: 'Beth June',
}

const incompleteUserData = {
    password: 'password123',
    name: 'John Doe'
}

const badUserData = {
    username: 'john',
    password: '  ',
    apartment: "123",
    name: '   '
}

const updatedUserData = {
    username: 'new@email.com',
    password: 'newpass123',
    name: 'Jane Doe'
}


const newTodoData = {
    title: 'Broken front door',
    description: 'The north building front door handle is broken',
    dueDate: new Date('2023-07-15'),
    isComplete: false
}

const badTodoData = {
    title: '   ',
    description: 1,
    dueDate: "new date",
    isComplete: 10
}

const incompleteTodoData = {
    title: 'Broken front door',
}

const updatedTodoData = {
    title: 'Broken back door',
    description: 'The south building front door handle is broken',
    status: "started"
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
    phoneNumber: "03 9873 1567",
    email: 'john@email.com',
}

const incompleteContactData = {
    name: "Freds's Plumbing",
}

const badContactData = {
    name: "   ",
    phoneNumber: 2,
    email: 1,
}

const updatedContactData = {
    name: "Freds's Plumbing",
    phoneNumber: "03 9261 1567",
    email: 'fredn@email.com',
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
    updatedContactData
}