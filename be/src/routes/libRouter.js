const express = require('express');
const router = express.Router();
const libCtrl = require('../app/controllers/libCtrl');
const penaltyOrderCtrl = require('../app/controllers/penaltyOrderCtrl');

router.get('/penaltyOrder/:id', penaltyOrderCtrl.getPenaltyOrderByIdLib);
router.post('/updateAmount', libCtrl.updateAmount);
router.get('/:id', libCtrl.getLibById);
router.get('/', libCtrl.getAllLibs);



module.exports = router;