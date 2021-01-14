const express = require('express')
const router = express.Router({ 'caseSensitive': true });
const { checkUserExist } = require('../controllers/auth.js');

router.get('/check_user', (req, res) => {
    let { username, email } = req.body;
    if (!username && !email || username && email) {
        res.sendStatus(400);
    }
    let val = username || email;
    let type = username !== undefined ? 'username' : 'email';
    checkUserExist(type, val)
        .then((data) => res.status(200).send(data))
        .catch((err) => {
            res.status(500).send(err);
        })
});

module.exports = router;
