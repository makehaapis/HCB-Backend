const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Station = require('../models/station')

const initialStations = [
  {
    _id: 1000,
    FID: "12",
    ID: "1000",
    Nimi: "Testiasema",
    Namn: "Testiasema",
    Name: "Testiasema",
    Osoite: "Testiasemankuja 1",
    Adress: "Teststationalley 1",
    Kaupunki: "Testikylä",
    Stad: "Testvillage",
    Operaattor: "Testioperaattori",
    Kapasiteet: "10",
    x: "60.23",
    y: "60.23"
  },
  {
    _id: 1001,
    FID: "13",
    ID: "1001",
    Nimi: "Testiasema2",
    Namn: "Testiasema2",
    Name: "Testiasema2",
    Osoite: "Testiasemankuja 2",
    Adress: "Teststationalley 2",
    Kaupunki: "Testikylä 2",
    Stad: "Testvillage 2",
    Operaattor: "Testioperaattori 2",
    Kapasiteet: "10",
    x: "60.23",
    y: "60.23"
  },
]

beforeEach(async () => {
  await Station.deleteMany({})
  let station = new Station(initialStations[0])
  await station.save()
  station = new Station(initialStations[1])
  await station.save()
})


test('Stations are returned as json', async () => {
  await api
    .get('/api/stations')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all Stations are returned', async () => {
  const response = await api.get('/api/stations')

  expect(response.body).toHaveLength(initialStations.length)
})

test('a specific stations is within the returned stations', async () => {
  const response = await api.get('/api/stations')

  const names = response.body.map(r => r.Nimi)

  expect(names).toContain(
    'Testiasema'
  )
})

afterAll(async () => {
  await mongoose.connection.close()
})