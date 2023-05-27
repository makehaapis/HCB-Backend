const stationsRouter = require('express').Router()
const Station = require('../models/station')
//const Journey = require('../models/journey')
const middleware = require('../utils/middleware')

stationsRouter.get('/', async (request, response) => {
  const stations = await Station.find({})//.populate('journey')
  response.json(stations)
})

stationsRouter.get('/:id', async (request, response) => {
  const station = await Station.findById(request.params.id)
  if (station) {
    response.json(station)
  } else {
    response.status(400).json({error: "not found"})
  }
})

module.exports = stationsRouter