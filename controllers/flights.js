const db = require('../database/index.js');
const { inserter, selectAll, deleter } = require('./queries.js');
const { getVotes } = require('./votes.js');


module.exports = {
    createFlightSuggestion: (data) => {
        return new Promise((resolve, reject) => {
            let { outgoing, returning, meta } = data;
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

            db.query(outgoingQuery)
                .then((outgoingData) => {
                    // console.log(outgoingData);
                    db.query(returningQuery)
                        .then(({ rows }) => {
                            let data = {
                                meta: meta,
                                outgoing: outgoing,
                                returning: outgoing,
                            }
                            data.meta.upvotes = 0;
                            data.meta.downvotes = 0;
                            data.meta.time_created = rows[0].time_created;
                            data.meta.num_of_seats = rows[0].num_of_seats;
                            data.meta.suggestion_id = rows[0].suggestion_id;
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
        return new Promise((resolve, reject) => {
            let query = {
                text: 'SELECT flights.*, users.username FROM flights, users WHERE trip_id = $1 AND users.user_id = flights.user_id',
                values: [trip_id]
            };
            getVotes(trip_id)
                .then((voteData) => {
                    voteData = voteData.rows;
                    db.query(query)
                        .then(({ rows }) => {
                            let dict = {};
                            for (flight of rows) {
                                let flight_class = flight.class;
                                let { trip_id,
                                    suggestion_id,
                                    user_id,
                                    username,
                                    nonstop,
                                    is_suggested,
                                    is_saved,
                                    flight_number,
                                    duration,
                                    arrival_airport,
                                    arrival_time,
                                    departure_airport,
                                    departure_time,
                                    departure_date,
                                    number_of_stops,
                                    carrier_code,
                                    operating_carrier_code,
                                    adults,
                                    upvotes,
                                    downvotes,
                                    time_created,
                                    type_of_flight,
                                    abbreviated_carrier_code,
                                    total_price,
                                    num_of_seats
                                } = flight;
                                dict[suggestion_id] = dict[suggestion_id] || { meta: {} };
                                dict[suggestion_id].meta.suggestion_id = suggestion_id;
                                dict[suggestion_id].meta.user_id = user_id;
                                dict[suggestion_id].meta.username = username;
                                dict[suggestion_id].meta.is_saved = is_saved;
                                dict[suggestion_id].meta.is_suggested = is_suggested;
                                dict[suggestion_id].meta.total_price = total_price;
                                dict[suggestion_id].meta.adults = adults;
                                dict[suggestion_id].meta.nonstop = nonstop;
                                dict[suggestion_id].meta.upvotes = upvotes;
                                dict[suggestion_id].meta.downvotes = downvotes;
                                dict[suggestion_id].meta.time_created = time_created;
                                dict[suggestion_id].meta.num_of_seats = num_of_seats;
                                dict[suggestion_id].meta.upvote_names = [];
                                dict[suggestion_id].meta.downvote_names = [];

                                dict[suggestion_id][type_of_flight] = dict[suggestion_id][type_of_flight] || {};
                                dict[suggestion_id][type_of_flight].duration = duration;
                                dict[suggestion_id][type_of_flight].arrival_airport = arrival_airport;
                                dict[suggestion_id][type_of_flight].arrival_time = arrival_time;
                                dict[suggestion_id][type_of_flight].departure_airport = departure_airport;
                                dict[suggestion_id][type_of_flight].departure_time = departure_time;
                                dict[suggestion_id][type_of_flight].departure_date = departure_date;
                                dict[suggestion_id][type_of_flight].number_of_stops = number_of_stops;
                                dict[suggestion_id][type_of_flight].carrier_code = carrier_code;
                                dict[suggestion_id][type_of_flight].operating_carrier_code = operating_carrier_code;
                                dict[suggestion_id][type_of_flight].class = flight_class;
                                dict[suggestion_id][type_of_flight].abbreviated_carrier_code = abbreviated_carrier_code;
                            }
                            for (let votes of voteData) {
                                if (dict[votes.suggestion_id]) {
                                    let {
                                        suggestion_id,
                                        user_id,
                                        username,
                                        num_value,
                                        type,
                                    } = votes;
                                    if (type === '+') {
                                        dict[suggestion_id].meta.upvotes += 1;
                                        dict[suggestion_id].meta.upvote_names.push(username);
                                    } else if (type === '-') {
                                        dict[suggestion_id].meta.downvotes += 1;
                                        dict[suggestion_id].meta.downvote_names.push(username);
                                    };
                                }

                            }
                            resolve(dict);
                        })
                        .catch((err) => {
                            console.log('error', err);
                            reject(err)
                        })

                })
                .catch((err) => reject())


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
    deleteFlight: (suggestion_id) => {
        return new Promise((resolve, reject) => {
            let query = deleter('flights', 'suggestion_id', suggestion_id);
            db.query(query)
                .then(resolve)
                .catch((err) => reject(err))
        })
    },
}
