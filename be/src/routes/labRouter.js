const express = require('express');
const router = express.Router();
const labCtrl = require('../app/controllers/labCtrl');
const rentCtrl = require('../app/controllers/rentCtrl');
const penaltyRentCtrl = require('../app/controllers/penaltyRentCtrl');


router.post('/updateAmount', labCtrl.updateAmount);
router.get('/rent/:id', rentCtrl.getOderFromIdLab);
router.post('/createOder/', rentCtrl.createOder);
router.post('/createPenaltyRent/', penaltyRentCtrl.createPenaltyRent);
router.put('/updateNotPenaltyRent/:id', penaltyRentCtrl.updateNotPenaltyRent);
router.get('/penaltyRent/:id', penaltyRentCtrl.getPenaltyRentByIdLab);
router.get('/', labCtrl.getAllLabs);
router.get('/:id', labCtrl.getLabById);


module.exports = router;