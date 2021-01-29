const express = require('express');
const router = express.Router({ 'caseSensitive': true });
const createEventController = require('../controllers/saved_events');

router.get('/', createEventController);
router.post('/', createEventController);
router.patch('/', createEventController);
router.delete('/', createEventController);

module.exports = router;
