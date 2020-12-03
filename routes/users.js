const express = require('express')
const router = express.Router({ 'caseSensitive': true });
const { createUser, getUser } = require('../controllers/users.js');

//should check if email/user already exists
router.post('/', (req, res) => {
    let { username, password, email, trip_id } = req.body;
    if (!username || !password || !email || !trip_id) return res.sendStatus(400).send('incorrect arguments');
    createUser(username, password, email, trip_id)
        .then((data) => res.status(201).send(data.rows[0]))
        .catch((err) => res.sendStatus(500))
});

router.get('/:user_id', (req, res) => {
    let { user_id } = req.params;
    getUser(user_id)
        .then((data) => res.status(200).json(data.rows))
        .catch((err) => {
            console.log(err)
            res.sendStatus(500);
        })
});

module.exports = router;
