const db = require('../database/index.js');
const {inserter, selectAll, selectAllWithUsernames} = require('./queries.js');

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
        return new Promise((resolve, reject) => {
            let query = selectAllWithUsernames('messages', 'trip_id', trip_id);
            db.query(query)
                .then((data) => resolve(data.rows))
                .catch((err) => reject(err))
        })
    }
    //TODO
    //updateMessage
    //deleteMessage
}
