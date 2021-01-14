const express = require('express')
const router = express.Router({ 'caseSensitive': true });
const { createMessage, getMessages, updateMessage, deleteMessage } = require('../controllers/messages.js');

router.post('/', (req, res, next) => {
    let { user_id, trip_id, message } = req.body;
    if (!user_id || !trip_id || !message) return res.sendStatus(400);
    createMessage(req.body)
        .then((data) => res.status(201).send(data))
        .catch((err) => res.status(500).send(err))
});

router.get('/', (req, res) => {
    if(req.query.trip_id) {
        let {trip_id} = req.query;
        getMessages(trip_id)
            .then((data) => res.status(200).send(data))
            .catch((err) => res.status(500).send(err))
    } else {
        res.sendStatus(400);
    }
})

module.exports = router;
