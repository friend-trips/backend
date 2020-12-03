const express = require('express')
const router = express.Router({ 'caseSensitive': true });
const { createTrip } = require('../controllers/trips.js');

router.post('/', (req, res, next) => {
    let { name } = req.body;
    if (!name) return res.sendStatus(400);
    createTrip(name)
        .then((data) => res.status(201).json(data.rows[0]))
        .catch((err) => res.sendStatus(500).json('did not add'))
});

router.get('/:trip_id', (req, res) => {
    let { trip_id } = req.params;
    getTrip(trip_id)
        .then((data) => res.sendStatus(201).json(data.rows))
        .catch((err) => res.sendStatus(500).json('did not add'))
});

// router.put('/:tripId', (req, res, next) => {
//     res.send('hello');
// });

// router.delete('/:tripId', (req, res, next) => {
//     res.send('hello');
// });

module.exports = router;
