const express = require('express');
const router = express.Router({ 'caseSensitive': true });
const createEventController = require('../controllers/saved_events');

router.get('/:itinerary_id', createEventController);

module.exports = router;
