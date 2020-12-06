const db = require('../database/index.js');
const {inserter, selectAll} = require('./queries.js');

module.exports = {
    createHotelSuggestion: (hotelData) => {
        return new Promise((resolve, reject) => {
            hotelData.upvotes = 0;
            hotelData.downvotes = '1';
            hotelData.time_created = `${Date.now()}`;
            let query = inserter('hotels', hotelData);
            db.query(query)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    console.error(err);
                    reject(err);
                })
        })
    },
    getAllHotels: (trip_id) => {
        return new Promise((resolve, reject) => {
        let query = selectAll('hotels', 'trip_id', trip_id)
            db.query(query)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    console.error(err);
                    reject(err);
                })
        })
    },
}
