const express = require('express');
const router = express.Router({ 'caseSensitive': true });
const createEventController = require('../controllers/saved_events');

router.get('/itinerary/:itinerary_id', createEventController);
router.post('/', createEventController);
router.patch('/:event_id', createEventController);
router.delete('/:event_id', createEventController);

module.exports = router;
