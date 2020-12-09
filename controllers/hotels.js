const db = require('../database/index.js');
const { inserter, selectAll, selectAllWithUsernames } = require('./queries.js');
const { getVotes } = require('./votes.js');

module.exports = {
    createHotelSuggestion: (hotelData) => {
        return new Promise((resolve, reject) => {
            hotelData.suggestion_id = hotelData.check_in_date + hotelData.check_out_date + hotelData.user_id;
            hotelData.upvotes = 0;
            hotelData.downvotes = 0;
            hotelData.time_created = `${Date.now()}`;
            let query = inserter('hotels', hotelData);
            console.log('hello')
            db.query(query)
                .then((result) => resolve(result))
                .catch((err) => {
                    reject(err)
                })
        })
    },
    getAllHotels: (trip_id) => {
        return new Promise(async (resolve, reject) => {
            let query = selectAllWithUsernames('hotels', 'trip_id', trip_id)
            let allHotelData = await db.query(query);
            let votesData = await getVotes(trip_id);

            console.log(allHotelData)

            let hotelData = {};
            for (let hotel of allHotelData.rows) {
                hotelData[hotel.suggestion_id] = hotel;
                hotelData[hotel.suggestion_id].upvote_names = [];
                hotelData[hotel.suggestion_id].downvote_names = [];
            }
            for (let vote of votesData.rows) {
                if (hotelData[vote.suggestion_id]) {
                    if (vote.type === '+') {
                        hotelData[vote.suggestion_id].upvote_names.push(vote.username);
                        hotelData[vote.suggestion_id].upvotes++;
                    } else {
                        hotelData[vote.suggestion_id].downvote_names.push(vote.username);
                        hotelData[vote.suggestion_id].downvotes++;
                    }
                }
            }
            resolve(hotelData);
        })
    },
}
