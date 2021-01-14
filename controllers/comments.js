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
    getComments: ({message_id}) => {
        return new Promise((resolve, reject) => {
            let getCommentQuery = selectAll('comments', 'message_id', message_id)
            db.query(getCommentQuery)
                .then((commentData) => resolve(commentData.rows))
                .catch((err) => reject(err))
        })
    },
    getAllComments: ({trip_id}) => {
        return new Promise((resolve, reject) => {
            let query = selectAllWithUsernames('comments', 'trip_id', Number(trip_id))
            db.query(query)
                .then((commentsData) => resolve(commentsData.rows))
                .catch((err) => reject(err))
        })
    },
}
