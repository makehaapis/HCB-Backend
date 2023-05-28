const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stationSchema = Schema({
  _id: Number,
  FID: String,
  ID: String,
  Nimi: String,
  Namn: String,
  Name: String,
  Osoite: String,
  Adress: String,
  Kaupunki: String,
  Stad: String,
  Operaattor: String,
  Kapasiteet: String,
  x: String,
  y: String,
  journeys: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Journey'
    }
  ],
})

stationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.FID
    delete returnedObject.ID
  }
})

module.exports = mongoose.model('Station', stationSchema)