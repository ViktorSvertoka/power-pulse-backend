const express = require('express');

const ctrl = require('../../controllers/auth');

const { schemas } = require('../../models/user');

const {
  validateBody,
  checkBody,
  authenticate,
  upload,
  uploadCloud,
} = require('../../middlewares');

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
  '/avatars',
  authenticate,
  upload.single('avatar'),
  ctrl.updateAvatar
);

router.post(
  '/avatar',
  authenticate,
  uploadCloud.single('avatar'),
  ctrl.addAvatar
);
router.post(
  '/recipe',
  authenticate,
  uploadCloud.single('recipe'),
  ctrl.addAvatar
);

module.exports = router;
