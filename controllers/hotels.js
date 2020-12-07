const db = require('../database/index.js');
const {inserter, selectAll} = require('./queries.js');

module.exports = {
    createHotelSuggestion: (hotelData) => {
        return new Promise((resolve, reject) => {
            hotelData.upvotes = 0;
            hotelData.suggestion_id = hotelData.check_in_date + hotelData.check_out_date + hotelData.user_id;
            hotelData.downvotes = 0;
            hotelData.time_created = `${Date.now()}`;
            let query = inserter('hotels', hotelData);
            db.query(query)
                .then((result) => resolve(result))
                .catch((err) => reject(err))
        })
    },
    getAllHotels: (trip_id) => {
        return new Promise((resolve, reject) => {
            let query = selectAll('hotels', 'trip_id', trip_id)
                db.query(query)
                    .then((result) => {
                        resolve(result.rows);
                    })
                    .catch((err) => {
                        console.error(err);
                        reject(err);
                    })
        })
    },
}
