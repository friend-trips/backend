const db = require('../database/index.js');

module.exports = {
    createTrip: (name) => {
        return new Promise((res, rej) => {
            let query = {
                text: 'INSERT INTO trips(name) VALUES ($1) RETURNING trip_id',
                values: [name],
            }
            db.query(query)
                .then((results) => {
                    let data = {
                        trip_id: results.rows[0].trip_id,
                        name: name,
                    }
                    res(data);
                })
                .catch((err) => rej(err))
        })
    },
    getAllTrips: () => {
        return new Promise((res, rej) => {
            let query = `SELECT * FROM trips`;
            db.query(query)
                .then((results) => res(results))
                .catch((err) => {
                    console.error(err);
                    rej(err)
                })
        })
    }
};
