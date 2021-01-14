const express = require('express')
const router = express.Router({ 'caseSensitive': true });
const { createUser, getUser, checkUserExist } = require('../controllers/users.js');

//should check if email/user already exists
router.post('/', (req, res) => {
    let { username, password, email } = req.body;
    if (!username || !password || !email) return res.sendStatus(400);
    createUser(username, password, email)
        .then((data) => res.status(201).send(data))
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

// check - user

router.get('/check_user', (req, res) => {
    let { user_id, email } = req.params;
    if (!user_id && !email || user_id && email) {
        res.sendStatus(400);
    }
    console.log('hello world')
    let queryValue = user_id || email;
    let type = user_id ? 'user_id' : 'email';
    checkUserExist(queryValue, type)
        .then((data) => res.status(200).json(data))
        .catch((err) => {
            res.sendStatus(500);
        })
});

module.exports = router;
