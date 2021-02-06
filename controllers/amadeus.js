const express = require('express')
const router = express.Router({ 'caseSensitive': true });
const {getCityCode} = require('../models/amadeus');

router.get('/city_code', (req, res) => {
  let {keyword, subType} = req.query;
  console.log(req.query);
  getCityCode(keyword, subType)
    .then((results) => res.status(200).send(results))
    .catch((err) => res.status(500).send(err))

})

module.exports = router;
