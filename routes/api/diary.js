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

router.delete(
  '/deleteproduct',
  authenticate,
  // validateBody(schemasProduct.delProductSchemaJoi),
  ctrl.deleteProduct
);

router.post(
  '/addexercise',
  authenticate,
  validateBody(schemas.diaryAddExerciseSchemaJoi),
  ctrl.addExercise
);

router.delete(
  '/deleteexercise',
  authenticate,
  validateBody(schemas.diaryDelExerciseSchemaJoi),
  ctrl.deleteExercise
);

router.get('/getproduct', authenticate, ctrl.getProduct);

router.get('/getexercise', authenticate, ctrl.getExercise);

module.exports = router;
