const express = require('express')
const router = express.Router({ 'caseSensitive': true });
const mapboxController = require('../controllers/mapbox.js');

router.use('/', mapboxController);

module.exports = router;