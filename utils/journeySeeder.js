const Journey = require('../models/journey')
const config = require('./config')
const fs = require('fs');
const csv = require("fast-csv");
var mongoose = require('mongoose'); 

mongoose.connect(config.MONGODB_URI)

const files = ['2021-05.csv','2021-06.csv','2021-07.csv']
let journeys = [];
let invalidJourneys = [];
let buffer = 0;

const Seed = (file, journeys, invalidJourneys, buffer) => {
  let readStream = fs.createReadStream(file);
  let seedStream = csv
  .parse({ headers: ['departureTime','returnTime','departureStationID','departureStationName','returnStationID','returnStationName','distance','duration'], skipRows: 1, ignoreEmpty: true , trim: true})
  .on("data", async (journey) => {
    journey = parseJourney(journey)
    if (validateJourneys(journey) == false) {
      invalidJourneys.push({...journey })
      console.log(`Invalid: ${journey.departureTime} ${journey.returnTime} ${journey.departureStationID} ${journey.departureStationName} ${journey.returnStationID} ${journey.returnStationName} ${journey.distance} ${journey.duration}`);
    }
    else {
      ++buffer;
      journeys.push({ ...journey });
    }
    if (buffer >= 500) {
      seedStream.pause();
      await Journey.insertMany(journeys);
      buffer = 0;
      journeys = [];
      seedStream.resume();
    }
  })
  .on("error", (error) => {
    console.log("Error:", error);
  })
  .on("end", async (rowCount) => {
    console.log(rowCount)
    await Journey.insertMany(journeys);
    journeys = [];
    mongoose.disconnect();
  })
  readStream.pipe(seedStream);
}

const parseJourney = (journey) => {
  journey.departureDate = Date.parse(journey.departureDate);
  journey.returnDate = Date.parse(journey.returnDate);
  journey.distance = Number(journey.distance);
  journey.duration = Number(journey.duration);
  journey.departureStationID = Number(journey.departureStationID);
  journey.returnStationID = Number(journey.returnStationID);
  return journey;
}

const validateJourneys = (journey) => {
  if (
    journey["departureTime"] == "" ||
    journey["returnTime"] == "" ||
    journey["departureStationID"] == "" ||
    journey["departureStationName"] == "" ||
    journey["returnStationID"] == "" ||
    journey["returnStationName"] == "" ||
    parseInt(journey["distance"]) < 10 ||
    parseInt(journey["duration"]) < 10
  ) {
    return false;
  } else { return true; }
}

files.forEach((file) => Seed(file, journeys, invalidJourneys, buffer))