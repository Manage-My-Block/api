const mongoose = require('mongoose')

async function dbConnector(URL) {
    await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
}

async function dbDisconnector() {
    await mongoose.connection.close()
}

module.exports = {
    dbConnector, dbDisconnector
}