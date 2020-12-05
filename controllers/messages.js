const db = require('../database/index.js');
const moment = require('moment');

module.exports = {
    createMessage: (user_id, trip_id, message) => {
        return new Promise((res, rej) => {
            let date = moment().format().split('T')[0];
            let time = moment().format('LT');
            let query = {
                text: 'INSERT INTO messages(user_id, trip_id, has_comments, message, date, time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING message_id',
                values: [user_id, trip_id, 0, message, date, time],
            }
            db.query(query)
                .then((results) => {
                    let data = {
                        trip_id: trip_id,
                        user_id: user_id,
                        message_id: results.rows[0].message_id,
                        message: message,
                        date: date,
                        time: time,
                    }
                    res(data);
                })
                .catch((err) => {
                    console.log(err)
                    rej(err)
                })
        })
    },
    getMessages: (trip_id) => {
        return new Promise((res, rej) => {
            let query = {
                text: 'SELECT messages.user_id, users.username, messages.message_id, messages.message, messages.has_comments, messages.date messages.time FROM users, messages WHERE messages.user_id = users.user_id AND messages.trip_id = $1',
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
