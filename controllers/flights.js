const db = require('../database/index.js');

//take two things in.
//query for all with the trip id
//object with the specific id
//add objects
//and return


// duration: `${result.itineraries[0].segments[0].duration.slice(2, 5).toLowerCase()} ${result.itineraries[0].segments[0].duration.slice(5).toLowerCase()}`,
// arrival_airport: result.itineraries[0].segments[0].arrival.iataCode,
// arrival_time: changeTime(result.itineraries[0].segments[0].arrival.at.slice(11, 16)),
// departure_airport: result.itineraries[0].segments[0].departure.iataCode,
// departure_time: changeTime(result.itineraries[0].segments[0].departure.at.slice(11, 16)),
// departure_date: formatDate(`${result.itineraries[0].segments[0].departure.at.slice(5, 10)}-${result.itineraries[0].segments[0].departure.at.slice(0, 4)}`),
// flight_number: result.itineraries[0].segments[0].number,
// number_of_stops: result.itineraries[0].segments[0].numberOfStops,
// carrier_code: flightDictionary[result.itineraries[0].segments[0].carrierCode],
// operating_carrier_code: result.itineraries[0].segments[0].operating.carrierCode,
// outgoing_class: result.travelerPricings[0].fareDetailsBySegment[0].cabin,

// returnDuration: `${result.itineraries[1].segments[0].duration.slice(2, 5).toLowerCase()} ${result.itineraries[1].segments[0].duration.slice(5).toLowerCase()}`,
// returnArrivalAirport: result.itineraries[1].segments[0].arrival.iataCode,
// returnArrivalTime: changeTime(result.itineraries[1].segments[0].arrival.at.slice(11, 16)),
// returnDepartureAirport: result.itineraries[1].segments[0].departure.iataCode,
// returnDepartureTime: changeTime(result.itineraries[1].segments[0].departure.at.slice(11, 16)),
// returnDepartureDate: formatDate(`${result.itineraries[1].segments[0].departure.at.slice(5, 10)}-${result.itineraries[1].segments[0].departure.at.slice(0, 4)}`),
// returnFlightNumber: result.itineraries[1].segments[0].number,
// returnNumberOfStops: result.itineraries[1].segments[0].numberOfStops,
// returnCarrierCode: flightDictionary[result.itineraries[1].segments[0].carrierCode],
// returnOperatingCarrierCode: result.itineraries[1].segments[0].operating.carrierCode,
// returnClass: result.travelerPricings[0].fareDetailsBySegment[1].cabin

// adults: adults
// travelClass: seatClass,
// nonStop: nonstop,

module.exports = {
    createFlightSuggestion: (data) => {
    },
    generateFakeData: () => {
        let obj = {
            meta: {
                adults: 1,
                travelClass: 'travelclass',
                nonStop: 'nonstop',
            },
            outgoing: {
                duration: 'duration',
                arrival_airport: 'arrival_airport',
                arrival_time: 'arrival_time',
                departure_airport: 'departure_airport',
                departure_time: 'departure_time',
                departure_date: 'departure_date',
                flight_number: 'flight_number',
                number_of_stops: 'number_of_stops',
                carrier_code: 'carrier_code',
                operating_carrier_code: 'operating_carrier_code',
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
                class: 'returning outgoing class'
            }
        }
        return new Promise((res, rej) => {
            res(obj);
        })
    },
}