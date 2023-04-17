const express = require('express');
const router = express.Router();
const penaltyCtrl = require('../app/controllers/penaltyCtrl');
const penaltyRentCtrl = require('../app/controllers/penaltyRentCtrl');



router.get('/', penaltyCtrl.getAllPenalties);
router.get('/:id', penaltyCtrl.getPenaltyById);
router.get('/penaltyRent/:id', penaltyRentCtrl.getPenaltyRentByIdPenalty);
router.put('/updateStatusPenalty/:id', penaltyRentCtrl.updateStatusPenalty);

module.exports = router;