const express = require('express');

const router = express.Router();

// const { userValidationSchema } = require('../../models/diaryExercise');
const { authenticate } = require('../../middlewares');


const ctrl = require('../../controllers/userData');

router.patch("/:id/adddata", authenticate,  ctrl.addUserData );




module.exports = router;
