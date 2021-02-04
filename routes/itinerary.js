const express = require('express')
const router = express.Router({ 'caseSensitive': true });
const { createItinerary, getItinerary, addSuggestion, removeSuggestion , getAllItineraries} = require('../controllers/itinerary.js');
const eventController = require('../controllers/saved_events');

//itinerary create this at some point for itinerary
// router.get('/itinerary/:itinerary_id', createEventController);
// router.post('/', createEventController);
// router.patch('/:event_id', createEventController);
// router.delete('/:event_id', createEventController);

//saved_events
router.get('/:itinerary_id/events', eventController);
router.post('/:itinerary_id/events', eventController);
router.patch('/:itinerary_id/events/:event_id', eventController);
router.delete('/:itinerary_id/events/:event_id', eventController);

router.post('/', (req, res) => {
    let { user_id, trip_id } = req.body;
    if (!user_id || !trip_id) return res.sendStatus(400);
    createItinerary(req.body)
        .then((data) => res.status(201).send(data))
        .catch((err) => res.sendStatus(500))
});

router.get('/', (req, res) => {
    let { itinerary_id, trip_id } = req.query;
    if (!itinerary_id || !trip_id) return res.sendStatus(400);
    getItinerary(itinerary_id, trip_id)
        .then((data) => res.status(200).send(data))
        .catch((err) => res.status(500).send(err))
})

router.get('/getAll/:trip_id', (req, res) => {
  console.log(req.params)
  getAllItineraries(Number(req.params.trip_id))
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err))
})

router.post('/suggestion', (req, res) => {
    let { itinerary_id, suggestion_id } = req.body;
    if (!itinerary_id || !suggestion_id) return res.sendStatus(400);
    addSuggestion(req.body)
        .then((data) => res.status(201).send(data))
        .catch((err) => res.sendStatus(500))
});

router.delete('/suggestion', (req, res) => {
    removeSuggestion(req.body)
        .then((data) => res.sendStatus(204))
        .catch((err) => res.sendStatus(500))
});

module.exports = router;
