const express = require('express')
const router = express.Router({ 'caseSensitive': true });
const { createPoi, getPoiById, getAllPOIs } = require('../controllers/pois.js');

//should check if email/user already exists
router.post('/', (req, res) => {
    let poi = req.body;
    console.log('poi route received POST', poi)
    createPoi(poi)
        .then((data) => res.status(201).send(data))
        .catch((err) => res.sendStatus(500))
});

router.get('/', (req, res) => {
  getAllPOIs()
    .then((data) => {
      console.log('success getting data', data)
      res.status(200).json(data.rows)
    })
    .catch((err) => {
      console.log('error getting all pois', err)
      res.status(500).send(err)
    })
})

router.get('/:poi_id', (req, res) => {
    let { poi_id } = req.params;
    getPoiById(poi_id)
        .then((data) => res.status(200).json(data.rows))
        .catch((err) => {
            console.log(err)
            res.sendStatus(500);
        })
});

module.exports = router;
