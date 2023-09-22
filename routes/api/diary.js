const express = require('express');
const router = express.Router();
const { authenticate } = require('../../middlewares');
const ctrl = require('../../controllers/diary/getDiary');
const deleteProduct = require('../../controllers/diary/deleteProduct');
const deleteExercise = require('../../controllers/diary/deleteExercise');

router.get('/', authenticate, ctrl.getDiary);
router.delete('/delete-product', authenticate, deleteProduct);
router.delete('/delete-exercise', authenticate, deleteExercise);

module.exports = router;
