const express = require('express');
const router = express.Router();
const penaltyCtrl = require('../app/controllers/penaltyCtrl');
const penaltyOrderCtrl = require('../app/controllers/penaltyOrderCtrl');



router.get('/', penaltyCtrl.getAllPenalties);
router.get('/:id', penaltyCtrl.getPenaltyById);
router.get('/penaltyOrder/:id', penaltyOrderCtrl.getPenaltyOrderByIdPenalty);
router.put('/updateStatusPenalty/:id', penaltyOrderCtrl.updateStatusPenalty);

module.exports = router;