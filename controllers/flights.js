const db = require('../database/index.js');
const {inserter, selectAll} = require('./queries.js');

//take two things in.
//query for all with the trip id
//object with the specific id
//add objects
//and return

module.exports = {
    createFlightSuggestion: (data) => {
        return new Promise((resolve, reject) => {
            let {outgoing, returning, meta} = data;
                outgoing.suggestion_id = outgoing.flight_number + returning.flight_number + meta.user_id;
                returning.suggestion_id = outgoing.flight_number + returning.flight_number + meta.user_id;
                outgoing.upvotes = 0;
                returning.upvotes = 0;
                outgoing.downvotes = 0;
                returning.downvotes = 0;
                let time = `${Date.now()}`;
                outgoing.time_created = time;
                returning.time_created = time;
                outgoing.type_of_flight = 'outgoing';
                returning.type_of_flight = 'returning';
                outgoing.total_price = meta.total_price;
                returning.total_price = meta.total_price;

                outgoing.trip_id = meta.trip_id;
                returning.trip_id = meta.trip_id;
                outgoing.user_id = meta.user_id;
                returning.user_id = meta.user_id;
                outgoing.adults = meta.adults;
                returning.adults = meta.adults;
                outgoing.nonstop = meta.nonstop;
                returning.nonstop = meta.nonstop;
                outgoing.is_suggested = meta.is_suggested;
                returning.is_suggested = meta.is_suggested;
                outgoing.is_saved = meta.is_saved;
                returning.is_saved = meta.is_saved;

                let outgoingQuery = inserter('flights', outgoing);
                let returningQuery = inserter('flights', returning);
                console.log(returningQuery)

                db.query(outgoingQuery)
                .then((outgoingData) => {
                    console.log(outgoingData);
                    db.query(returningQuery)
                        .then((returningData) => {
                            let data = {
                                meta: meta,
                                outgoing: outgoing,
                                returning: outgoing,
                            }
                            resolve(data);
                        })
                        .catch((err) => reject(err))
                })
                .catch((err) => {
                    reject(err);
                })

        })
    },
    getAllFlights: (trip_id) => {
        return new Promise((res, rej) => {
        let query = {
            text: 'SELECT * FROM flights WHERE trip_id = $1',
            values: [trip_id]
        };

        db.query(query)
        .then(({rows}) => {
            let dict = {};
            for (flight of rows) {
                dict[flight.flight_id] = dict[flight.flight_id] || {};
                dict[flight.flight_id][flight.type_of_flight] = flight;
            }
            res(dict);
        })
        .catch((err) => {
            console.log('error', err);
            rej(err)
        })
    })
    },
    generateFakeData: () => {
        let obj = {
            meta: {
                trip_id: 1, //give
                suggestion_id: 'outgoing_flight_number' + 'returning_flight_number',
                created_by_user_id: 1, //give
                adults: 1, //give
                non_stop: 'nonstop', //give
                is_suggested: false, //give
                is_saved: false, //give
                upvotes: 0, //create
                downvotes: 0, //create
                time_created: 'date', //create
            },
            outgoing: {
                duration: 'outgoing duration',
                arrival_airport: 'outgoing arrival_airport',
                arrival_time: 'outgoing arrival_time',
                departure_airport: 'outgoing departure_airport',
                departure_time: 'outgoing departure_time',
                departure_date: 'outgoing departure_date',
                flight_number: 'outgoing flight_number',
                number_of_stops: 'outgoing number_of_stops',
                carrier_code: 'outgoing carrier_code',
                operating_carrier_code: 'outgoing operating_carrier_code',
                class: 'outgoing class'
            },
            returning: {
                duration: 'returning duration',
                arrival_airport: 'returning arrival_airport',
                arrival_time: 'returning arrival_time',
                departure_airport: 'returning departure_airport',
                departure_time: 'returning departure_time',
                departure_date: 'returning departure_date',
                flight_number: 'returning light_number',
                number_of_stops: 'returning number_of_stops',
                carrier_code: 'returning carrier_code',
                operating_carrier_code: 'returning operating_carrier_code',
                class: 'returning class'
            }
        }
        return new Promise((res, rej) => {
            res(obj);
        })
    },
}

// flight_id SERIAL,
// trip_id INTEGER,
// unique_id VARCHAR(20),
// user_id INTEGER,
// non_stop VARCHAR(20),
// is_suggested VARCHAR(6),
// is_saved VARCHAR(6),
// duration  VARCHAR(20),
// arrival_airport  VARCHAR(20),
// arrival_time  VARCHAR(20),
// departure_airport  VARCHAR(20),
// departure_time  VARCHAR(20),
// departure_date  VARCHAR(20),
// number_of_stops  INTEGER,
// carrier_code  VARCHAR(20),
// operating_carrier_code  VARCHAR(20),
// class  VARCHAR(20),
// adults INTEGER,
// upvotes INTEGER,
// downvotes INTEGER,
// time_created VARCHAR(20),

// INSERT INTO flights (trip_id, unique_id, user_id, non_stop, is_suggested, is_saved, duration, arrival_airport, arrival_time, departure_airport, departure_time, departure_date, number_of_stops, carrier_code, operating_carrier_code, class, adults, upvotes, downvotes, time_created) VALUES (1, '123', 1, 'yes', 'bool', 'bool', 'duration', 'arrival_airport', 'arrival_time', 'departure_airport', 'departure_time', 'departure_date', 1, 'carrier_code', 'operating_carrier', 'class', 1, 0, 0, 'time_created')