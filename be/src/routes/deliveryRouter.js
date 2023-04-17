const express = require('express');
const router = express.Router();
const deliveryCtrl = require('../app/controllers/deliveryCtrl');

router.get('/from/:id', deliveryCtrl.getDeliveriesFromId);
router.get('/to/:id', deliveryCtrl.getDeliveriesToId);
router.post('/createDeliveryByLib', deliveryCtrl.createDeliveryByLib);
router.post('/createDeliveryByLab', deliveryCtrl.createDeliveryByLab);
router.put('/updateStatus/:id', deliveryCtrl.updateStatus);

module.exports = router;