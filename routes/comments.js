const express = require('express')
const router = express.Router({ 'caseSensitive': true });
const { createComment, getComments } = require('../controllers/comments.js');

router.post('/', (req, res, next) => {
    let { message_id, user_id, comment } = req.body;
    if (!message_id || !user_id || !comment) return res.sendStatus(400);
    createComment(message_id, user_id, comment)
        .then((data) => res.status(201).send(data))
        .catch((err) => res.status(500).send(err))
});

router.get('/', (req, res) => {
    let { message_id } = req.body;
    if (!message_id) return res.sendStatus(400);
    getComments(message_id)
        .then((data) => res.status(200).send(data.rows))
        .catch((err) => res.status(500).send(err))

});

module.exports = router;

