const db = require('../database/index.js');

module.exports = {
    createPoi: ({trip_id, user_id, poi_id, name, category, tags, latitude, longitude, created}) => {
        return new Promise((res, rej) => {
            let tagArray = `{${tags.join(', ')}}`;
            let query = {
                text: 'INSERT INTO pois(trip_id, user_id, poi_id, name, category, tags, latitude, longitude, created) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
                values: [trip_id, user_id, poi_id, name, category, tagArray, latitude, longitude, created],
            };
            db.query(query)
                .then((results) => {
                  console.log('insert POI', results)
                  res(results.rows[0]);
                    // res(data);
                })
                .catch((err) => {
                    console.log('insertPOI err', err)
                    rej(err)
                })
        })
    },
    getPoiById: (poi_id) => {
        return new Promise((res, rej) => {
            let query = {
                text: 'SELECT * FROM pois WHERE poi_id = $1',
                values: [poi_id],
            }
            db.query(query)
                .then((results) => res(results))
                .catch((err) => rej(err))
        })
    },
    getAllPOIs: () => {
      return new Promise((res, rej) => {
        let query = {
          text: 'SELECT * FROM pois'
        }
        db.query(query)
          .then((results) => {
            res(results);
          })
          .catch((err) => {
            rej(err);
          })
      })
    }
}
