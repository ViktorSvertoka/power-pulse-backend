const express = require('express');
const { schemas } = require('../../models/diaryProduct');

const router = express.Router();

const { validateBody, authenticate } = require('../../middlewares');

const ctrl = require('../../controllers/diary');

router.post('/addproduct', authenticate, validateBody(schemas.productSchemaJoi), ctrl.addProduct);

router.delete('/deleteproduct', authenticate, validateBody(schemas.productSchemaJoi), ctrl.deleteProduct);

router.post('/addexercise', authenticate, validateBody(schemas.diaryExercisesShemaJoi), ctrl.addExercise);

router.delete('/deleteexercise', authenticate, validateBody(schemas.diaryExercisesShemaJoi), ctrl.deleteExercise);


module.exports = router;
