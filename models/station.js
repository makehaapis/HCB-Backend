const mongoose = require('mongoose')

const stationSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    address: String,
    capacity: Number,
    longitude: String,
    latitude: String,
    /*journeys: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Journey'
        }
    ],*/
})

stationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Station', stationSchema)