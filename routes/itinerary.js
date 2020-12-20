const express = require('express')
const router = express.Router({ 'caseSensitive': true });
const { createItinerary, getItinerary, addSuggestion, removeSuggestion } = require('../controllers/itinerary.js');

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
