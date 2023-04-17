const express = require('express');
const router = express.Router();
const libCtrl = require('../app/controllers/libCtrl');
const penaltyRentCtrl = require('../app/controllers/penaltyRentCtrl');

router.get('/penaltyRent/:id', penaltyRentCtrl.getPenaltyRentByIdLib);
router.post('/updateAmount', libCtrl.updateAmount);
router.get('/:id', libCtrl.getLibById);
router.get('/', libCtrl.getAllLibs);



module.exports = router;