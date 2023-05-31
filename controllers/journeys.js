const journeysRouter = require('express').Router()
const Journey = require('../models/journey')

journeysRouter.get('/', async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = 20;
    let startIndex = pageNumber * limit;
    const journey = await Journey.find()
      .skip(startIndex)
      .limit(limit)
      .exec();
    return res.json({ journey });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Sorry, something went wrong" });
  }
})

journeysRouter.get('/:id', async (request, response) => {
  const journey = await Journey.findById(request.params.id)
  if (journey) {
    response.json(journey)
  } else {
    response.status(400).json({error: "not found"})
  }
})

module.exports = journeysRouter