const express = require('express');

const router = express.Router();

const { authenticate } = require('../../middlewares');

const ctrl = require('../../controllers/products');

router.get('/', authenticate, ctrl.getAllProducts);



module.exports = router;
