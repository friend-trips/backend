const express = require('express')
const router = express.Router({ 'caseSensitive': true });
const { createFlightSuggestion, getAllFlights , generateFakeData, deleteFlight} = require('../controllers/flights.js');

router.post('/', (req, res, next) => {
    createFlightSuggestion(req.body)
        .then((data) => res.status(201).send(data))
        .catch((err) => {
            res.status(500).send(err)
        })
});

router.get('/', (req, res) => {
    let {trip_id} = req.query;
    if(!trip_id) return res.status(400).send('add trip_id');
    getAllFlights(Number(trip_id))
        .then((data) => res.status(200).send(data))
        .catch((err) => res.status(500).send(err))
});

router.get('/data', (req, res, next) => {
    console.log('helo')
    generateFakeData()
        .then((data) => res.status(201).send(data))
        .catch((err) => res.status(500).send(err))
});

router.delete('/flights/:suggestion_id', (req, res) => {
    deleteFlight(req.params.suggestion_id)
        .then((data) => res.sendStatus(204))
        .catch((err) => res.sendStatus(500))
});

module.exports = router;
