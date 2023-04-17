const express = require('express');
const router = express.Router();
const labCtrl = require('../app/controllers/labCtrl');
const orderCtrl = require('../app/controllers/orderCtrl');
const guaranteeOrderCtrl = require('../app/controllers/guaranteeOrderCtrl');


router.post('/updateAmount', labCtrl.updateAmount);
router.get('/order/:id', orderCtrl.getOderFromIdLab);
router.post('/createOder/', orderCtrl.createOder);
router.post('/createGuaranteeOrder/', guaranteeOrderCtrl.createGuaranteeOrder);
router.put('/updateNotGuaranteeOrder/:id', guaranteeOrderCtrl.updateNotGuaranteeOrder);
router.get('/guaranteeOrder/:id', guaranteeOrderCtrl.getGuaranteeOrderByIdLab);
router.get('/', labCtrl.getAllLabs);
router.get('/:id', labCtrl.getLabById);


module.exports = router;