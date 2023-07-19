const express = require('express');
const router = express.Router();
const toysCtrl = require('../../controllers/api/toys');
const ensureOwner = require('../../config/ensureOwner');


// GET /api/items
router.get('/', toysCtrl.index)
// GET /api/items/:id
router.get('/:id', toysCtrl.show)

router.post('/', toysCtrl.create)

router.post('/:id', toysCtrl.deleteOneToy)

router.post('/request/:id', toysCtrl.requestToy)

router.post('/accept/:id', toysCtrl.acceptRequest)



module.exports = router