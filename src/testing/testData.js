const newUserData = {
    username: 'john@email.com',
    password: 'password123',
    apartment: 123,
    name: 'John Doe'
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

let URL = ""
switch (process.env.NODE_ENV) {
    case "production":
        URL = process.env.DATABASE_URL
        break;
    case "development":
        URL = "mongodb://localhost:27017/dev_db"
        break;
    case "test":
        URL = "mongodb://localhost:27017/test_db"
        break;
    default:
        console.log("Missing db URL")
}

module.exports = {
    URL, newUserData, incompleteUserData, updatedUserData, newTodoData, incompleteTodoData, updatedTodoData
}