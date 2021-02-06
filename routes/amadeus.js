const express = require('express')
const router = express.Router({ 'caseSensitive': true });
const amadeusController = require('../controllers/amadeus');

router.get('/city_code', amadeusController);
router.get('/flights', amadeusController);
router.get('/hotels', amadeusController);
router.get('/hotel_offers', amadeusController);
router.get('/POI', amadeusController);

module.exports = router;

