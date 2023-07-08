const { app, PORT, HOST } = require('./app')

app.listen(PORT, HOST, () => {
    console.log("Server started, listening on port " + PORT)
})