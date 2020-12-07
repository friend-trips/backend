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
            let query = selectAll('sii', 'itinerary_id', itinerary_id);
            let siiData = await db.query(query);
            let flightData = await getAllFlights(trip_id);
            let hotelData = await getAllHotels(trip_id);
            if(!siiData.rows.length) return reject('no saved itinerary');
            let unique_sii = new Set();
            let siiCollection = {};
            for (let {suggestion_id, sii_id} of siiData.rows) {
                unique_sii.add(suggestion_id);
                siiCollection[suggestion_id] = sii_id;
            }

            let results = {flights: [], hotels: []};
            for (let flightSuggestedId in flightData) {
                if(unique_sii.has(flightSuggestedId)) {
                    flightData[flightSuggestedId].sii_id = siiCollection[flightSuggestedId]
                    results.flights.push(flightData[flightSuggestedId])
                }
            }

            results.hotels = hotelData.filter((hotel) => {
                if(unique_sii.has(hotel.suggestion_id)) {
                    hotel.sii_id = siiCollection[hotel.suggestion_id]
                    return hotel;
                }
            })
            console.log(unique_sii)
            console.log(siiCollection)
            resolve(results);
        })
    },
    addSuggestion: (suggestionData) => {
        return new Promise((resolve, reject) => {
            let query = inserter('sii', suggestionData);
            db.query(query)
                .then((data) => resolve(data))
                .catch((err) => {
                    console.log(err)
                    reject(err)
                })
        })
    },
    removeSuggestion: ({sii_id}) => {
        return new Promise((resolve, reject) => {
            let query = deleter('sii', 'sii_id', sii_id);
            db.query(query)
                .then(resolve)
                .catch((err) => reject(err))
        })
    },
}