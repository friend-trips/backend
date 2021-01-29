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
    .catch(() => res.send('did not work'))
})
//would never get one individually
router.get('/:itinerary_id', (req, res) => {
  console.log('hello', req.params)
  getEvents(req.params.itinerary_id)
    .then((data) => res.status(200).send(data.rows))
    .catch(() => res.status(500).send('did not work'))
})

router.patch('/:event_id', (req, res) => {
  let {title, type, description} = req.body;

  let event = {
    title: title || 'no name',
    type: type || 'no type',
    description: description || 'no description',
    date:`${Date.now()}`
  }

  updateEvent(event)
    .then((data) => res.send(data))
    .catch(() => res.send('did not work'))
})

router.delete('/:event_id', (req, res) => {
  deleteEvent(req.params.event_id)
    .then((data) => res.sendStatus(204))
    .catch(() => res.send('did not work'))
})

module.exports = router;
