const express = require('express');
const router = express.Router();
const labCtrl = require('../app/controllers/labCtrl');
const orderCtrl = require('../app/controllers/orderCtrl');
const penaltyOrderCtrl = require('../app/controllers/penaltyOrderCtrl');


router.post('/updateAmount', labCtrl.updateAmount);
router.get('/order/:id', orderCtrl.getOderFromIdLab);
router.post('/createOder/', orderCtrl.createOder);
router.post('/createPenaltyOrder/', penaltyOrderCtrl.createPenaltyOrder);
router.put('/updateNotPenaltyOrder/:id', penaltyOrderCtrl.updateNotPenaltyOrder);
router.get('/penaltyOrder/:id', penaltyOrderCtrl.getPenaltyOrderByIdLab);
router.get('/', labCtrl.getAllLabs);
router.get('/:id', labCtrl.getLabById);


module.exports = router;