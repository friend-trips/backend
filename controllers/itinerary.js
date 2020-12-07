const db = require('../database/index.js');
const moment = require('moment');
const {inserter, deleter, selectAll} = require('./queries.js');
const {getAllFlights} = require('./flights.js');
const {getAllHotels} = require('./hotels.js');

module.exports = {
    createItinerary: (itineraryData) => {
        return new Promise((resolve, reject) => {
            itineraryData.time_created = `${Date.now()}`;
            itineraryData.last_updated = `${Date.now()}`;
            let query = inserter('itinerary', itineraryData);
            db.query(query)
                .then((data) => resolve(data.rows))
                .catch((err) => reject(err))
        })
    },
    getItinerary: (itinerary_id, trip_id) => {
        return new Promise(async (resolve, reject) => {
            let query = selectAll('s_and_i', 'itinerary_id', itinerary_id);

            let s_iData = await db.query(query);
            let flightData = await getAllFlights(trip_id);
            let hotelData = await getAllHotels(trip_id);
            if(!s_iData.rows.length) return reject('no saved itinerary');

            let unique_sid = new Set();
            for (let {suggestion_id} of s_iData.rows) {
                unique_sid.add(suggestion_id);
            }
            // console.log(flightData, 'flightData')
            let results = {flights: [], hotels: []};

            for (let flightDataSuggestionId in flightData) {
                console.log('flightDataSuggestionId', flightDataSuggestionId)
                if(unique_sid.has(flightDataSuggestionId)) {
                    results.flights.push(flightData[flightDataSuggestionId])
                }
            }

            results.hotels = hotelData.filter((hotel) => {
                if(unique_sid.has(hotel.suggestion_id)) {
                    return hotel;
                }
            })

            // for (let )

            console.log(results)
            // console.log(flightData)
            // console.log(hotelData)
            resolve(results);
        })
    },
    addSuggestion: (suggestionData) => {
        return new Promise((resolve, reject) => {
            let query = inserter('s_and_i', suggestionData);
            db.query(query)
                .then((data) => resolve(data))
                .catch((err) => {
                    console.log(err)
                    reject(err)
                })
        })
    },
    removeSuggestion: ({si_id}) => {
        return new Promise((resolve, reject) => {
            let query = deleter('s_and_i', 'si_id', si_id);
            db.query(query)
                .then(resolve)
                .catch((err) => reject(err))
        })
    },
}