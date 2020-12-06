const express = require('express')
const router = express.Router({ 'caseSensitive': true });
const { createHotelSuggestion, getAllHotels } = require('../controllers/hotels.js');

router.post('/', (req, res, next) => {
    createHotelSuggestion(req.body)
        .then((data) => res.status(201).send(data))
        .catch((err) => res.status(500).send(err))
});

router.get('/', (req, res) => {
    let { trip_id } = req.body;
    getAllHotels(trip_id)
        .then((data) => res.status(200).send(data.rows))
        .catch((err) => res.status(500).send(err))

});

module.exports = router;

