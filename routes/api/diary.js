const express = require('express');
const { schemas } = require('../../models/diary');
const router = express.Router();
const { validateBody, authenticate } = require('../../middlewares');
const ctrl = require('../../controllers/diary');

router.post(
  '/addproduct',
  authenticate,
  validateBody(schemas.productSchemaJoi),
  ctrl.addProduct
);

router.delete('/deleteproduct', authenticate, ctrl.deleteProduct);

router.post(
  '/addexercise',
  authenticate,
  validateBody(schemas.exerciseSchemaJoi),
  ctrl.addExercise
);

router.delete(
  '/deleteexercise',
  authenticate,
  validateBody(schemas.delExerciseSchemaJoi),
  ctrl.deleteExercise
);

router.get('/', authenticate, ctrl.getDiary);

module.exports = router;
