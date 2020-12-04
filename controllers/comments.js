const db = require('../database/index.js');
const moment = require('moment');

module.exports = {
    createComment: (message_id, user_id, comment) => {
        return new Promise((res, rej) => {
            let date = moment().format().split('T')[0];
            let time = moment().format('LT');
            let query = {
                text: 'INSERT INTO comments(message_id, user_id, comment, date, time) VALUES ($1, $2, $3, $4, $5) RETURNING comment_id',
                values: [message_id, user_id, comment, date, time],
            };
            db.query(query)
                .then((results) => {
                    let data = {
                        user_id: user_id,
                        message_id: message_id,
                        comment_id: results.rows[0].comment_id,
                        comment: comment,
                        date: date,
                        time: time,
                    }
                    res(data);
                })
                .catch((err) => {
                    console.log(err);
                    rej(err)
                })
        })
    },
    getComments: (message_id) => {
        return new Promise((res, rej) => {
            let query = {
                text: 'SELECT comments.user_id, users.username, comments.comment_id, comments.comment, comments.date FROM users, comments WHERE comments.user_id = users.user_id AND comments.message_id = $1',
                values: [message_id]
            }
            db.query(query)
                .then((data) => res(data))
                .catch((err) => {
                    console.log(err);
                    rej(err)
                })
        })
    },
}