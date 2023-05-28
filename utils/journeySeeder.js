const Station = require('../models/station')
const config = require('./config')
const fs = require('fs');
const csv = require("fast-csv");

const seed = () => {
  let stations = [];
  let readStream = fs.createReadStream('stations.csv');
  let insertStream = csv
    .parse({ headers: true, ignoreEmpty: true })
    .on("data", (station) => {
      station._id = station.ID
      stations.push({ ...station });
    })
    .on("error", (error) => {
      console.log("oh no", error);
    })
    .on("end", async (rowCount) => {
      await Station.insertMany(stations);
      console.log(`Added ${rowCount} documents to database`);
    });
  readStream.pipe(insertStream);
  stations = []
};

module.exports = {seed};