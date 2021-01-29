const {saveEvent, createEvent, updateEvent, deleteEvent} = require('../models/saved_events');
const express = require('express');
const router = express.Router({ 'caseSensitive': true });

router.get('/:itinerary_id', (req, res) => {
  if(!req.params.itinerary_id) {
    return res.send('invalid id');
  }
  saveEvent(req.params.itinerary_id)
    .then((data) => res.send(data))
    .catch(() => res.send('did not work'))
})

router.post('/:itinerary_id', (req, res) => {
  let {title, type, description} = req.body;
  let event = {
    title: title || 'no name',
    type: type || 'no type',
    description: description || 'no description',
    date:`${Date.now()}`
  }
  createEvent(event)
    .then((data) => res.send(data))
    .catch(() => res.send('did not work'))
})

module.exports = router;
