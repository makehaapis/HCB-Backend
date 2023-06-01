const stationsRouter = require('express').Router()
const Journey = require("../models/journey");
const Station = require('../models/station')

stationsRouter.get('/', async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = 20;
    let startIndex = pageNumber * limit;
    const stations = await Station.find()
      .skip(startIndex)
      .limit(limit)
      .exec();
    return res.json(stations);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Sorry, something went wrong" });
  }
})

stationsRouter.get('/:id', async (request, response) => {
  const station = await Station.findById(request.params.id)
  if (station) {
  const departures = await Journey.find({"departureStationName": station.Nimi})
  const returns = await Journey.find({ "returnStationName": station.Nimi });
  let totalDepartureDistance = 0
  departures.forEach(journey => {
    totalDepartureDistance += journey.distance
  });
  let totalReturningDistance = 0
  returns.forEach(journey => {
    totalReturningDistance += journey.distance
  });
  const details = {
    station: station,
    totalDepartures: departures.length,
    totalReturns: returns.length,
    avgDepartureDistance: totalDepartureDistance/departures.length,
    avgReturningDistance: totalReturningDistance/returns.length
  }
  response.json(details);
}
else {
    response.status(400).json({error: "not found"})
}
})

module.exports = stationsRouter