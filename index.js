const express = require('express')
const app = express()

let stations = [
      {
      "id": 501,
      "name": "Hanasaari",
      "address": "Hanasaarenranta 1",
      "capacity": 10,
      "longitude": "24.840319",
      "latitude" : "60.16582"
    },
    {
        "id": 503,
        "name": "Keilalahti",
        "address": "Keilalahdentie 2",
        "capacity": 28,
        "longitude": "24.827467",
        "latitude" : "60.171524"
      },
      {
        "id": 503,
        "name": "Westendinasema",
        "address": "Westendintie 1",
        "capacity": 16,
        "longitude": "24.805758",
        "latitude" : "60.168266"
      }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/stations', (req, res) => {
  res.json(stations)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})