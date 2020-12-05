const express = require('express')
const router = express.Router({ 'caseSensitive': true });
const { createFlightSuggestion, getFlightSuggestions , generateFakeData} = require('../controllers/flights.js');

router.post('/', (req, res, next) => {
    let { data } = req.body
    createFlightSuggestion(data)
        .then((data) => res.status(201).send(data))
        .catch((err) => res.status(500).send(err))
});

// router.get('/', (req, res) => {
//     let { trip_id } = req.body;
//     getFlightSuggestions(trip_id)
//         .then((data) => res.status(200).send(data.rows))
//         .catch((err) => res.status(500).send(err))
//
// });

router.get('/data', (req, res, next) => {
    console.log('helo')
    generateFakeData()
        .then((data) => res.status(201).send(data))
        .catch((err) => res.status(500).send(err))
});

module.exports = router;

