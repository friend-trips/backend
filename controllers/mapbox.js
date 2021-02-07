const express = require('express')
const router = express.Router({ 'caseSensitive': true });

router.get('/', (req, res) => {
  console.log('got mapbox req')
  if (process.env.MAPBOX_TOKEN) {
    res.status(200).send(process.env.MAPBOX_TOKEN)
  } else {
    res.status(503).send()
  }
})

module.exports = router;
