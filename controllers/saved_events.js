const {getEvents, createEvent, updateEvent, deleteEvent} = require('../models/saved_events');
const express = require('express');
const router = express.Router({ 'caseSensitive': true });

router.post('/', (req, res) => {
  let {title, type, description, itinerary_id} = req.body;
  let event = {
    itinerary_id,
    title: title || 'no name',
    type: type || 'no type',
    description: description || 'no description',
    date:`${Date.now()}`
  }
  createEvent(event)
    .then((data) => res.status(201).send(data.rows[0]))
    .catch((err) => res.status(500).send(err))
})
//would never get one individually
router.get('/:itinerary_id', (req, res) => {
  getEvents(req.params.itinerary_id)
    .then((data) => res.status(200).send(data.rows))
    .catch((err) => res.status(500).send(err))
})
//create middleware in order to check if the key is title, type description or date
router.patch('/:event_id', (req, res) => {
  let {event_id} = req.params;
  for (let key in req.body) {
    updateEvent(key, req.body[key], event_id)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err))
  }
})

//even if the event id doesnt exist, it will send a 204
router.delete('/:event_id', (req, res) => {
  deleteEvent(req.params.event_id)
    .then((data) => res.sendStatus(204))
    .catch((err) => res.status(500).send(err))
})

module.exports = router;