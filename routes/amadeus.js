const express = require('express')
const router = express.Router({ 'caseSensitive': true });
const amadeusController = require('../controllers/amadeus');

router.get('/city_code', amadeusController);
router.post('/flights', amadeusController);
router.post('/hotels', amadeusController);
router.post('/hotel_offers', amadeusController);
router.get('/POI', amadeusController);

module.exports = router;

// ?
// keyword
// =
// value&
// let result = '?';

// for (let key in obj) {
//   result += key + '=' + obj[key] + '&'
// }

// return result