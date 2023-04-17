const express = require('express');
const router = express.Router();
const bookCtrl = require('../app/controllers/bookCtrl');

router.get('/allBooks', bookCtrl.getAllBooks);
router.get('/allBooksFactory/:id', bookCtrl.getAllBooksFactory);
router.post('/create', bookCtrl.create);
router.post('/update', bookCtrl.update);
router.post('/delete', bookCtrl.delete);




module.exports = router;