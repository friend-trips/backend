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
  getFlights: () => {
    return new Promise((resolve, reject) => {

    })
  },
  getHotels: (data) => {
    return new Promise((resolve, reject) => {
      amadeus.shopping.hotelOffers.get(data)
        .then(resolve)
        .catch(reject)
      })
  },
  getHotelOffers: () => {

  },
  getPOIS: () => {

  },

}