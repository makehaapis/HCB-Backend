const Station = require('../models/station')
const config = require('./config')
const fs = require('fs');
const csv = require("fast-csv");
const mongoose = require('mongoose')

mongoose.set('debug', false);
mongoose.connect(config.MONGODB_URI)

let stations = [];
let readStream = fs.createReadStream('Helsingin_ja_Espoon_kaupunkipy%C3%B6r%C3%A4asemat_avoin.csv');
let seedStream = csv
  .parse({ headers: true, ignoreEmpty: true })
  .on("data", (station) => {
    console.log(station)
     station._id = station.ID
      stations.push({ ...station });
  })
  .on("error", (error) => {
      console.log("Error: ", error);
    })
    .on("end", async (rowCount) => {
      console.log(rowCount)
      await Station.insertMany(stations);
      mongoose.disconnect()
    });
  readStream.pipe(seedStream);
  stations = []

