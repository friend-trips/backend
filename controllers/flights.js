const db = require('../database/index.js');

//take two things in.
//query for all with the trip id
//object with the specific id
//add objects
//and return

module.exports = {
    createFlightSuggestion: (data) => {
        return new Promise((res, rej) => {
            let {outgoing, returning, meta} = data;
            meta.flight_id = outgoing.flight_number + returning.flight_number + meta.user_id;
            meta.upvotes = 0;
            meta.downvotes = 0;
            meta.time_created = `${Date.now()}`;

            let outgoing_query = {
                text: 'INSERT INTO flights(trip_id, flight_id, user_id, non_stop, is_suggested, is_saved, duration, arrival_airport, arrival_time, departure_airport, departure_time, departure_date, number_of_stops, carrier_code, operating_carrier_code, class, adults, upvotes, downvotes, time_created, type_of_flight) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)',
                values: [meta.trip_id, meta.flight_id, meta.user_id, meta.non_stop, meta.is_suggested, meta.is_saved, outgoing.duration, outgoing.arrival_airport, outgoing.arrival_time, outgoing.departure_airport, outgoing.departure_time, outgoing.departure_date, outgoing.number_of_stops, outgoing.carrier_code, outgoing.operating_carrier_code, outgoing.class, meta.adults, meta.upvotes, meta.downvotes, meta.time_created, 'outgoing']
            };

            let returning_query = {
                text: 'INSERT INTO flights(trip_id, flight_id, user_id, non_stop, is_suggested, is_saved, duration, arrival_airport, arrival_time, departure_airport, departure_time, departure_date, number_of_stops, carrier_code, operating_carrier_code, class, adults, upvotes, downvotes, time_created, type_of_flight) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)',
                values: [meta.trip_id, meta.flight_id, meta.user_id, meta.non_stop, meta.is_suggested, meta.is_saved, returning.duration, returning.arrival_airport, returning.arrival_time, returning.departure_airport, returning.departure_time, returning.departure_date, returning.number_of_stops, returning.carrier_code, returning.operating_carrier_code, returning.class, meta.adults, meta.upvotes, meta.downvotes, meta.time_created, 'returning']
            };

            db.query(outgoing_query)
            .then((results) => {
                db.query(returning_query)
                .then((results) => {
                    res(data);
                })
                .catch((err) => {
                    console.log('error', err);
                    rej(err)
                })
            })
            .catch((err) => {
                console.log('error', err);
                rej(err)
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