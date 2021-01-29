const db = require('../database/index.js');
const {inserter, selectAll, selectAllWithUsernames, updater, deleter} = require('../controllers/queries.js');

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
  updateEvent: (columnName, value, event_id) => {
    return new Promise((resolve, reject) => {
      let query = updater('saved_itinerary_events', columnName, value, 'event_id', event_id);
      db.query(query)
        .then(resolve)
        .catch(reject)
    })
  },
  deleteEvent: (event_id) => {
    return new Promise((resolve, reject) => {
      let query = deleter('saved_itinerary_events','event_id', event_id);
      db.query(query)
        .then(resolve)
        .catch(reject)
    })
  },
}
