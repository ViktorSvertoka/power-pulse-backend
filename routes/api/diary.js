const express = require('express');
const { schemasProduct } = require('../../models/diaryProduct');
const { schemas } = require('../../models/diaryExercise');
const router = express.Router();

const { validateBody, authenticate } = require('../../middlewares');

const ctrl = require('../../controllers/diary');

router.post(
  '/addproduct',
  authenticate,
  validateBody(schemasProduct.productSchemaJoi),
  ctrl.addProduct
);

router.delete('/deleteproduct', authenticate, ctrl.deleteProduct);

router.post(
  '/addexercise',
  authenticate,
  validateBody(schemas.diaryExerciseSсhemaJoi),
  ctrl.addExercise
);

router.delete(
  '/deleteexercise',
  authenticate,
  validateBody(schemas.diaryExerciseSсhemaJoi),
  ctrl.deleteExercise
);

router.get('/getproduct', authenticate, ctrl.getProduct);

router.get('/getexercise', authenticate, ctrl.getExercise);

module.exports = router;
