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

const incompleteTodoData = {
}

const updatedTodoData = {
    title: 'Broken back door',
    description: 'The south building front door handle is broken'
}



const newNoticeData = {
    title: 'Block party',
    description: 'Anyone keen on throwing a block party?'
}

const incompleteNoticeData = {
}

const updatedNoticeData = {
    title: 'BBQ party',
    description: 'Anyone keen on throwing a BBQ party?'
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
    URL, newUserData, incompleteUserData, updatedUserData, newTodoData, incompleteTodoData, updatedTodoData, newNoticeData, incompleteNoticeData, updatedNoticeData, user2, user3
}