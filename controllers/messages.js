const db = require('../database/index.js');
const moment = require('moment');

module.exports = {
    createMessage: (user_id, trip_id, message) => {
        return new Promise((res, rej) => {
            let date = moment().format().split('T')[0];
            let query = {
                text: 'INSERT INTO messages(user_id, trip_id, has_comments, message, date) VALUES ($1, $2, $3, $4, $5)',
                values: [user_id, trip_id, 0, message, date],
            }
            db.query(query)
                .then((data) => res(data))
                .catch((err) => rej(err))
        })
    },
    getMessages: (trip_id) => {
        return new Promise((res, rej) => {
            let query = {
                text: 'SELECT * FROM messages WHERE trip_id = $1',
                values: [trip_id]
            }
            db.query(query)
                .then((data) => res(data))
                .catch((err) => rej(err))
        })
    }
    //TODO
    //updateMessage
    //deleteMessage
}