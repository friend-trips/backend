const express = require('express')
const router = express.Router({ 'caseSensitive': true });
const Amadeus = require('../models/amadeus');

router.get('/city_code', (req, res) => {
  let {keyword, subType} = req.query;
  Amadeus.getCityCode(keyword, subType)
    .then((results) => res.status(200).send(results))
    .catch((err) => res.status(500).send(err))
})

router.get('/flights', (req, res) => {
  Amadeus.getFlights()
    .then((results) => res.status(200).send(results))
    .catch((err) => res.status(500).send(err))
})

router.get('/hotels', (req, res) => {
  let {data} = req.body;
  Amadeus.getHotels(data)
    .then((arr) => {
      const newArr = arr.map((result) => {
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

      return newArr;
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
  Amadeus.getPOIS()
    .then((results) => res.status(200).send(results))
    .catch((err) => res.status(500).send(err))
})

module.exports = router;
