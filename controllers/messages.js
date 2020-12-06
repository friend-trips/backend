const db = require('../database/index.js');
const {inserter, selectAll} = require('./queries.js');

module.exports = {
    createMessage: (messageData) => {
        return new Promise((res, rej) => {
            messageData.timestamp = `${Date.now()}`;
            messageData.has_comments = 0;
            let messageQuery = inserter('messages', messageData);
            db.query(messageQuery)
                .then((results) => {
                    res(results.rows[0]);
                })
                .catch((err) => {
                    rej(err)
                })
        })
    },
    getMessages: (trip_id) => {
        return new Promise((res, rej) => {
            let query = {
                text: 'SELECT messages.user_id, users.username, messages.message_id, messages.message, messages.has_comments, messages.date, messages.time FROM users, messages WHERE messages.user_id = users.user_id AND messages.trip_id = $1',
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
