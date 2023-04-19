const express = require('express');
const router = express.Router();
// const penaltyCtrl = require('../app/controllers/penaltyCtrl');
const rentPenaltyCtrl = require('../app/controllers/rentPenaltyCtrl');



router.get('/', rentPenaltyCtrl.getAllPenalties);
router.get('/:id', rentPenaltyCtrl.getRentPenaltyByIdPenalty);
router.get('/rentPenalty/:id', rentPenaltyCtrl.getRentPenaltyByIdPenalty);
router.put('/updateStatusPenalty/:id', rentPenaltyCtrl.updateStatusPenalty);

module.exports = router; 