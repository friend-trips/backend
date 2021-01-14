const db = require('../database/index.js');

module.exports = {
    createUser: (username, password, email) => {
        return new Promise((res, rej) => {
            let query = {
                text: 'INSERT INTO users(username, password, email) VALUES ($1, $2, $3) RETURNING user_id',
                values: [username, password, email],
            }
            db.query(query)
                .then((results) => {
                    let data = {
                        user_id: results.rows[0].user_id,
                        username: username,
                        email: email,
                    }
                    res(data);
                })
                .catch((err) => {
                    console.log(err)
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
    },
    checkUserExist: (queryValue, type) => {
        return new Promise((res, rej) => {
            console.log('hello')
            let query = {
                text: `SELECT * FROM users WHERE $1 = $2`,
                values: [type, queryValue],
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
