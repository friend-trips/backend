const db = require('../database/index.js');
const {inserter, selectAll, selectAllWithUsernames} = require('../controllers/queries.js');

module.exports = {
  createEvent: (event) => {
    return new Promise((resolve, reject) => {
      let query = inserter('saved_itinerary_events', event);
      db.query(query)
        .then(resolve)
        .catch(reject)
    })
  },
  getEvents: (itinerary_id) => {
    return new Promise((resolve, reject) => {
      let query = selectAll('saved_itinerary_events', 'itinerary_id', itinerary_id);
      console.log(query)
      db.query(query)
        .then(resolve)
        .catch(reject)
    })
  },
  updateEvent: () => {
    return new Promise((resolve, reject) => {
      resolve('the data came through')
    })
  },
  deleteEvent: () => {
    return new Promise((resolve, reject) => {
      resolve('the data came through')
    })
  },
}
