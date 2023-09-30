const express = require('express');

const ctrl = require('../../controllers/auth');

const { schemas } = require('../../models/user');

const { validateBody, checkBody, authenticate } = require('../../middlewares');

const uploadCloud = require('../../middlewares/uploadCloud');

const router = express.Router();

router.post(
  '/register',
  checkBody,
  validateBody(schemas.registerSchema),
  ctrl.register
);

router.get('/verify/:verificationToken', ctrl.verifyEmail);

router.post(
  '/verify',
  validateBody(schemas.emailSchema),
  ctrl.repeatEmailVerify
);

router.post('/login', checkBody, validateBody(schemas.loginSchema), ctrl.login);

router.get('/current', authenticate, ctrl.current);

router.post('/logout', authenticate, ctrl.logout);

router.patch(
  '/',
  authenticate,
  validateBody(schemas.addUserDataSchemaJoi),
  ctrl.addUserData
);

router.patch(
  '/params',
  authenticate,
  validateBody(schemas.addUserParamsSchemaJoi),
  ctrl.addUserData
);

router.get('/getuser', authenticate, ctrl.getUserParams);

router.patch(
  '/avatars',
  authenticate,
  uploadCloud.single('avatar'),
  ctrl.updateAvatar
);

module.exports = router;
