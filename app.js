const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const stationsRouter = require('./controllers/stations')
const journeysRouter = require('./controllers/journeys')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/stations', stationsRouter)
app.use('/api/journeys', journeysRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app