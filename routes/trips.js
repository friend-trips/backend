const express = require('express')
const router = express.Router({ 'caseSensitive': true });
const { createTrip, getAllTrips } = require('../controllers/trips.js');

router.post('/', (req, res, next) => {
    let { name } = req.body;
    if (!name) return res.sendStatus(400);
    createTrip(name)
        .then((data) => res.status(201).send(data))
        .catch((err) => res.sendStatus(500))
});

router.get('/', (req, res) => {
    getAllTrips()
        .then((data) => res.status(200).send(data.rows))
        .catch((err) => res.sendStatus(500).json('did not add'))
});

// router.put('/:tripId', (req, res, next) => {
//     res.send('hello');
// });

// router.delete('/:tripId', (req, res, next) => {
//     res.send('hello');
// });

module.exports = router;
