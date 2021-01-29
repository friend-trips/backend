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
  getEvents: (data) => {
    return new Promise((resolve, reject) => {
      resolve('the data came through')
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
