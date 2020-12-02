const db = require('../database/index.js');

module.exports = {
    createTrip: (name, cb) => {
        return new Promise((res, rej) => {
            let query = {
                text: 'INSERT INTO trips(name) VALUES ($1)',
                values: [name],
            }
            db.query(query)
                .then((results) => res(results))
                .catch((err) => rej(err))
        })
    },
    getTrip: (id, cb) => {
        return new Promise((res, rej) => {
            let query = {
                text: 'SELECT * from trips WHERE id = ($1)',
                values: [id],
            }
            db.query(query)
                .then((results) => res(results))
                .catch((err) => {
                    console.error(err);
                    rej(err)
                })
        })
    }
    //TODO
    //updateTrip - update the name
    //deleteTrip - delete a trip
};