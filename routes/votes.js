const express = require('express');
const router = express.Router({ 'caseSensitive': true });
const { addVote, getVotes } = require('../controllers/votes.js');

router.post('/', (req, res) => {
    let {type, user_id, suggestion_id, trip_id} = req.body;
    if(!type || !user_id || !suggestion_id || !trip_id) return res.sendStatus(400);
    addVote(req.body)
        .then((data) => res.status(201).send(data))
        .catch((err) => res.status(500).send(err))
});

router.get('/', (req, res) => {
    let {trip_id} = req.query;
    if(!trip_id) return res.sendStatus(400);
    getVotes(Number(trip_id))
        .then((data) => res.status(200).send(data))
        .catch((err) => res.status(500).send(err))
});

module.exports = router;
