const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const cors = require('cors')

// Routes imports
const { SeedRouter } = require('./controllers/Seeding/seedController')
const AuthRouter = require('./controllers/Authorisation/authRoutes')
const RoleRouter = require('./controllers/Roles/rolesRoutes')
const BuildingRouter = require('./controllers/Building/buildingRoutes')
const UserRouter = require('./controllers/Users/userRoutes')
const TodoRouter = require('./controllers/Todos/todosRoutes')
const NoticeRouter = require('./controllers/Notices/noticesRoutes')
const ContactRouter = require('./controllers/Contacts/contactRoutes')
const BudgetRouter = require('./controllers/Budget/budgetRoutes')
const MeetingRouter = require('./controllers/Meetings/meetingsRoutes')

// Express app instance
const app = express()

// Config environment variables
dotenv.config()
const HOST = process.env.HOST || 'localhost'
const DEPLOYED_SITE = process.env.DEPLOYED_SITE || 'localhost'
const PORT = process.env.PORT || 3000
const CLIENT_PORT = process.env.CLIENT_PORT || 5173 // default Vite dev port

// Config helmet for headers security
app.use(helmet())
app.use(helmet.permittedCrossDomainPolicies())
app.use(helmet.referrerPolicy())
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"]
    }
}))

// Config CORS to prevent external access to API
app.use(cors({
    origin: ["http://localhost:" + PORT, "http://localhost:" + CLIENT_PORT, DEPLOYED_SITE],
    optionsSuccessStatus: 200
}))


// Config request data formatting.

// Set the maximum file size limit to 10 MB (adjust it as needed)
const maxSize = '10mb' // 10 MB

app.use(express.json({ limit: maxSize }));
app.use(express.urlencoded({ extended: true }))


// Routes
app.use(SeedRouter)     // Seeding route for wiping db and seeding new data
app.use(AuthRouter)     // Login and register routes
app.use(RoleRouter)     // Roles routes
app.use(BuildingRouter) // Buildings routes
app.use(UserRouter)     // User routes
app.use(TodoRouter)     // Todo routes
app.use(NoticeRouter)   // Notice routes
app.use(ContactRouter)  // Contact routes
app.use(BudgetRouter)  // Contact routes
app.use(MeetingRouter)


app.get('/dbhealth', (req, res) => {    // Gets database health information
    res.json({
        readyState: mongoose.connection.readyState,
        dbName: mongoose.connection.name,
        dbModels: mongoose.connection.modelNames(),
        dbHost: mongoose.connection.host
    })
})

app.get('/', (req, res) => {            // Home route for info about the API
    res.json({
        message: "Welcome to StrataSphere, a building management API for tracking all Owners Corporation needs! For detailed documentation visit https://github.com/Manage-My-Block/StrataSphere-Docs"
    })
})

app.get('*', (request, response) => {   // Catch unknown routes
    response.status(404).json({
        message: "No route with that path found!",
        attemptedPath: request.path
    })
})


// Exports
module.exports = {
    app,
    HOST,
    PORT
}

