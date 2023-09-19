const express = require('express');

const router = express.Router();

const { authenticate } = require('../../middlewares');

const ctrl = require('../../controllers/exercises');

router.get('/', authenticate, ctrl.getAllExercisesName);

router.get('/bodyparts', authenticate, ctrl.getAllBodyParts);

router.get('/muscules', authenticate,ctrl.getAllMuscules);

router.get('/equipments', authenticate, ctrl.getAllEquipments);

module.exports = router;
