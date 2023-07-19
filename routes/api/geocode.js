const express = require('express');
const router = express.Router();
const geoCtrl = require('../../controllers/api/geocode');

router.get('/:address', geoCtrl.googleGeocode);

module.exports = router;