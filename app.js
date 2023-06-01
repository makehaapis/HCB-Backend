const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const stationsRouter = require('./controllers/stations')
const journeysRouter = require('./controllers/journeys')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
require('express-async-errors')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
})

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/stations', stationsRouter)
app.use('/api/journeys', journeysRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app