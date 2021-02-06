const express = require('express')
const router = express.Router({ 'caseSensitive': true });
const Amadeus = require('../models/amadeus');

router.get('/city_code', (req, res) => {
  let {keyword, subType} = req.query;
  console.log(keyword, subType, 'city code')
  Amadeus.getCityCode(keyword, subType)
    .then((results) => res.status(200).send(results))
    .catch((err) => res.status(500).send(err))
})

router.post('/hotels', (req, res) => {
  // let {data} = req.body;
  // console.log(data, 'hotels data');
  console.log(req.body, 'req.body');

  Amadeus.getHotels(req.body)
    .then(({data}) => {
      const newArr = data.map((result) => {
        const filteredResult = {};
        // store the hotelId
        filteredResult["hotelId"] = result["hotel"]["hotelId"];
        // store the name
        filteredResult["name"] = result["hotel"]["name"];
        // store the location
        const postalCode = result["hotel"]["address"]["postalCode"]
          ? " " + result["hotel"]["address"]["postalCode"]
          : "";
        const address =
          result["hotel"]["address"]["lines"][0] +
          " " +
          result["hotel"]["address"]["cityName"] +
          " " +
          result["hotel"]["address"]["countryCode"] +
          postalCode;
        filteredResult.latitude = result.hotel.latitude;
        filteredResult.longitude = result.hotel.longitude;
        filteredResult["address"] = address;
        filteredResult["rating"] = result["hotel"]["rating"];
        // store the hotel amenities
        filteredResult["amenities"] = result["hotel"]["amenities"];
        filteredResult["milesFromCenter"] =
          result["hotel"]["hotelDistance"]["distance"];
        return filteredResult;
      });

      // return newArr;
      res.status(200).send(newArr)
    })
    .catch((err) => res.status(500).send(err))
})

router.get('/hotel_offers', (req, res) => {
  Amadeus.getHotelOffers()
    .then((results) => res.status(200).send(results))
    .catch((err) => res.status(500).send(err))
})

router.get('/POI', (req, res) => {
  let {latitude, longitude} = req.query;
  console.log({latitude: Number(latitude), longitude: Number(longitude)}, 'query')
  Amadeus.getPOIS({latitude: Number(latitude), longitude: Number(longitude)})
    .then(({data}) => res.status(200).send(data))
    .catch((err) => {
      console.log(err);
      res.status(500).send(err)
    })
})

router.post('/flights', (req, res) => {
  Amadeus.getFlights(req.body)
    .then(({data}) => {
      const filterData = (array) => {
        function changeTime(timeString) {
          if (timeString.slice(0, 2) > 12) {
            let twelveHour = timeString.slice(0, 2) % 12;
            return twelveHour.toString().concat(timeString.slice(2)).concat(" pm");
          } else if (timeString[0] === "0") {
            return timeString.slice(1).concat(" am");
          } else {
            return timeString.concat(" am");
          }
        }

        function formatDate(str) {
          let dateArr = str.split("-");
          dateArr = dateArr.map((date) => {
            let MDYArr = date.split("");
            if (MDYArr[0] === "0") MDYArr.shift();
            return MDYArr.join("");
          });
          return dateArr.join("/");
        }

        return array.map((result) => {
          let filteredResult = {
            id: result.id,
            bookableSeats: result.numberOfBookableSeats,
            totalPrice: Math.floor(result.price.grandTotal),

            outgoingDuration: `${result.itineraries[0].segments[0].duration
              .slice(2, 5)
              .toLowerCase()} ${result.itineraries[0].segments[0].duration
                .slice(5)
                .toLowerCase()}`,
            outgoingArrivalAirport:
              result.itineraries[0].segments[0].arrival.iataCode,
            outgoingArrivalTime: changeTime(
              result.itineraries[0].segments[0].arrival.at.slice(11, 16)
            ),
            // outgoingArrivalDate: result.itineraries[0].segments[0].arrival.at.slice(0, 10),
            outgoingDepartureAirport:
              result.itineraries[0].segments[0].departure.iataCode,
            outgoingDepartureTime: changeTime(
              result.itineraries[0].segments[0].departure.at.slice(11, 16)
            ),
            outgoingDepartureDate: formatDate(
              `${result.itineraries[0].segments[0].departure.at.slice(
                5,
                10
              )}-${result.itineraries[0].segments[0].departure.at.slice(0, 4)}`
            ),
            outgoingFlightNumber: result.itineraries[0].segments[0].number,
            outgoingNumberOfStops: result.itineraries[0].segments[0].numberOfStops,
            outgoingCarrierCode:
              result.itineraries[0].segments[0].carrierCode,
            outgoingAbbreviatedCarrierCode:
              result.itineraries[0].segments[0].carrierCode,
            outgoingOperatingCarrierCode:
              result.itineraries[0].segments[0].operating.carrierCode,
            outgoingClass: result.travelerPricings[0].fareDetailsBySegment[0].cabin,

            returnDuration: `${result.itineraries[1].segments[0].duration
              .slice(2, 5)
              .toLowerCase()} ${result.itineraries[1].segments[0].duration
                .slice(5)
                .toLowerCase()}`,
            returnArrivalAirport:
              result.itineraries[1].segments[0].arrival.iataCode,
            returnArrivalTime: changeTime(
              result.itineraries[1].segments[0].arrival.at.slice(11, 16)
            ),
            // returnArrivalDate: result.itineraries[1].segments[0].arrival.at.slice(0, 10),
            returnDepartureAirport:
              result.itineraries[1].segments[0].departure.iataCode,
            returnDepartureTime: changeTime(
              result.itineraries[1].segments[0].departure.at.slice(11, 16)
            ),
            returnDepartureDate: formatDate(
              `${result.itineraries[1].segments[0].departure.at.slice(
                5,
                10
              )}-${result.itineraries[1].segments[0].departure.at.slice(0, 4)}`
            ),
            returnFlightNumber: result.itineraries[1].segments[0].number,
            returnNumberOfStops: result.itineraries[1].segments[0].numberOfStops,
            returnCarrierCode:
              result.itineraries[1].segments[0].carrierCode,
            returnAbbreviatedCarrierCode:
              result.itineraries[1].segments[0].carrierCode,
            returnOperatingCarrierCode:
              result.itineraries[1].segments[0].operating.carrierCode,
            returnClass: result.travelerPricings[0].fareDetailsBySegment[1].cabin,
            outgoingAbbreviatedCarrierCode:
              result.itineraries[0].segments[0].carrierCode,
            returnAbbreviatedCarrierCode:
              result.itineraries[1].segments[0].carrierCode,
          };
          return filteredResult;
        });
      };
      res.status(200).send(filterData(data))
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
})

module.exports = router;
