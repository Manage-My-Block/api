const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet');
const cors = require('cors');

// Routes imports
const { SeedRouter } = require('./controllers/Seeding/seedController')
const AuthRouter = require('./controllers/Authorisation/authRoutes')
const RoleRouter = require('./controllers/Roles/rolesRoutes')
const UserRouter = require('./controllers/Users/userRoutes')
const TodoRouter = require('./controllers/Todos/todosRoutes')
const NoticeRouter = require('./controllers/Notices/noticesRoutes')

// Express app instance
const app = express()

// Config environment variables
dotenv.config()
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;


// Config helmet for headers security
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"]
    }
}));

// Config CORS to prevent external access to API
app.use(cors({
    origin: ["http://localhost:" + PORT, HOST],
    optionsSuccessStatus: 200
}));


// Config request data formatting.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.get('/dbhealth', (req, res) => {
    res.json({
        readyState: mongoose.connection.readyState,
        dbName: mongoose.connection.name,
        dbModels: mongoose.connection.modelNames(),
        dbHost: mongoose.connection.host
    })
})

// User routes
app.use(SeedRouter)
app.use(AuthRouter)
app.use(RoleRouter)
app.use(UserRouter)
app.use(TodoRouter)
app.use(NoticeRouter)


// Final route catch to trigger if no previous routes found
app.get('*', (request, response) => {
    response.status(404).json({
        message: "No route with that path found!",
        attemptedPath: request.path
    });
});


// Exports
module.exports = {
    app,
    HOST,
    PORT
}

