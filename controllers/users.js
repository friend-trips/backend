const db = require('../database/index.js');

module.exports = {
    createUser: (username, password, email, trip_id) => {
        return new Promise((res, rej) => {
            let query = {
                text: 'INSERT INTO users(username, password, email, trip_id) VALUES ($1, $2, $3, $4) RETURNING user_id',
                values: [username, password, email, trip_id],
            }
            db.query(query)
                .then((results) => res(results))
                .catch((err) => {
                    rej(err)
                })
        })
    },
    getUser: (user_id) => {
        return new Promise((res, rej) => {
            let query = {
                text: 'SELECT * FROM users WHERE user_id = $1',
                values: [user_id],
            }
            db.query(query)
                .then((results) => res(results))
                .catch((err) => rej(err))
        })
    }
    //TODO
    //update user
    //delete user
}
