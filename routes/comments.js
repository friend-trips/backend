const express = require('express')
const router = express.Router({ 'caseSensitive': true });
const { createComment, getComments , getAllComments} = require('../controllers/comments.js');

router.post('/', (req, res, next) => {
    let { message_id, user_id, comment } = req.body;
    if (!message_id || !user_id || !comment) return res.sendStatus(400);
    createComment(req.body)
        .then((data) => res.status(201).send(data))
        .catch((err) => res.status(500).send(err))
});

router.get('/', (req, res) => {
    if(req.query.trip_id) {
        getAllComments(req.query)
            .then((data) => res.status(200).send(data))
            .catch((err) => res.status(500).send(err))

    } else if(req.query.message_id) {
        getComments(req.query)
            .then((data) => res.status(200).send(data))
            .catch((err) => res.status(500).send(err))

    } else {
        res.sendStatus(400);
    }
});

module.exports = router;

