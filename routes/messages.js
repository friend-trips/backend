const express = require('express')
const router = express.Router({ 'caseSensitive': true });
const { createMessage, getMessages, updateMessage, deleteMessage } = require('../controllers/messages.js');

router.post('/', (req, res, next) => {
    let { user_id, trip_id, message } = req.body;
    if (!user_id || !trip_id || !message) return res.sendStatus(400);
    createMessage(user_id, trip_id, message)
        .then((data) => res.sendStatus(201))
        .catch((err) => res.sendStatus(500))
});

router.get('/', (req, res) => {
    let { trip_id } = req.body;
    if (!trip_id) return res.sendStatus(400);
    getMessages(trip_id)
        .then((data) => res.status(200).send(data))
        .catch(() => res.sendStatus(500))
});

// router.put('/:tripId', (req, res, next) => {
//     res.send('hello');
// });

// router.delete('/:tripId', (req, res, next) => {
//     res.send('hello');
// });

module.exports = router;
