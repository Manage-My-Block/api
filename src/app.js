const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet');
const cors = require('cors');
const { dbConnector, dbDisconnector } = require('./database')

const SeedRouter = require('./controllers/Seeding/seedController')
const RoleRouter = require('./controllers/Roles/rolesRoutes')
const UserRouter = require('./controllers/Users/userRoutes')

// Express app instance
const app = express()

// Config environment variables
dotenv.config()
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
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
    origin: ["http://localhost:" + PORT, "https://deployedApp.com"],
    optionsSuccessStatus: 200
}));

// Config for shutdown
const cleanup = () => {
    dbDisconnector()
    console.log(`\nServer is shutting down. Database disconnected`)

    // Exit the process
    process.exit(0);
};

// Listen for the SIGINT signal (Ctrl+C)
process.on('SIGINT', cleanup);

// Listen for the SIGTERM signal (kill command or Heroku shutdown)
process.on('SIGTERM', cleanup);

// Handle server close event
app.on('close', () => {
    console.log('Server is shutting down.');
});

// Config request data formatting.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Connect database
dbConnector(URL).then(() => { console.log("Connected to database") }).catch(error => { console.log("Error connecting to db: " + error) })


// Middleware



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
app.use(RoleRouter)
app.use(UserRouter)





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

