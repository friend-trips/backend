const Amadeus = require("amadeus")

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT,
  clientSecret: process.env.AMADEUS_SECRET
})

module.exports = {
  getCityCode: (keyword, subType) => {
    return new Promise((resolve, reject) => {
      amadeus.referenceData.locations.get({
        keyword,
        subType
      })
        .then((res) => {
          let cities = res.data.map((row) => {
            return {
              name: row.name,
              cityCode: row.iataCode
            }
          })
          resolve(cities);
        })
        .catch((err) => {
          console.log(err)
          reject(err);
        })
    })
  },
  getFlights: (data) => {
    return new Promise((resolve, reject) => {
      amadeus.shopping.flightOffersSearch.get(data)
        .then((data) => {
          resolve(data)
        })
        .catch((err) => {
          resolve(err);
        })
    })
  },
  getHotels: (data) => {
    return new Promise((resolve, reject) => {
      amadeus.shopping.hotelOffers.get(data)
        .then(resolve)
        .catch((err) => {
          console.log(err);
          resolve(err);
        })
    })
  },
  getHotelOffers: (offerQuery) => {
    return new Promise((resolve, reject) => {
      console.log(offerQuery, 'offerquery')
      amadeus.shopping.hotelOffersByHotel
        .get(offerQuery)
        .then(resolve)
        .catch((err) => {
          console.log(err);
          reject(err)
        })
    })

  },
  getPOIS: (data) => {
    return new Promise((resolve, reject) => {
      amadeus.referenceData.locations.pointsOfInterest.get(data)
      .then((data) => {
          resolve(data)
        })
        .catch((err) => {
          console.log(err, 'error');
          reject(err);
        })

    })
},
}