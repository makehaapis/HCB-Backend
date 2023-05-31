const mongoose = require("mongoose");

const journeySchema = mongoose.Schema({
  departureTime: Date,
  returnTime: Date,   
  departureStationID: Number,                 
  departureStationName: String,
  returnStationID: Number,
  returnStationName: String,
  distance: Number,
  duration: Number,
})

module.exports = mongoose.model("Journey", journeySchema);