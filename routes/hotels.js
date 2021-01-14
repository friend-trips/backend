const express = require('express')
const router = express.Router({ 'caseSensitive': true });
const { createHotelSuggestion, getAllHotels } = require('../controllers/hotels.js');

router.post('/', (req, res, next) => {
    createHotelSuggestion(req.body)
        .then((data) => res.status(201).send(data))
        .catch((err) => res.status(500).send(err))
});

router.get('/', (req, res) => {
    if(req.query.trip_id) {
        let { trip_id } = req.query;
        getAllHotels(trip_id)
            .then((data) => res.status(200).send(data))
            .catch((err) => res.status(500).send(err))
    } else {
        res.sendStatus(400);
    }

});

module.exports = router;

