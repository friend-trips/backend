const db = require('../database/index.js');
const moment = require('moment');
const {inserter, selectAll, selectAllWithUsernames} = require('./queries.js');

module.exports = {
    createComment: (commentsData) => {
        return new Promise((res, rej) => {
            commentsData.timestamp = `${Date.now()}`;
            let commentQuery = inserter('comments', commentsData);
            db.query(commentQuery)
                .then((results) => {
                    res(results.rows[0]);
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
                    rej(err)
                })
        })
    },
    getAllComments: (trip_id) => {
        return new Promise((resolve, reject) => {

        })
    },
}