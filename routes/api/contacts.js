const express = require('express');

const ctrl = require('../../controllers/contacts');

const validateBody = require('../../middlewares/validateBody');
const checkBody = require('../../middlewares/checkBody');
const isValidId = require('../../middlewares/isValidId');
const authenticate = require('../../middlewares/authenticate');

const schemas = require('../../models/contact');

const router = express.Router();

router.get('/', authenticate, ctrl.listContacts);

router.get('/:id', authenticate, isValidId, ctrl.getContactById);

router.post(
  '/',
  authenticate,
  checkBody,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.delete('/:id', authenticate, isValidId, ctrl.removeContact);

router.put(
  '/:id',
  authenticate,
  isValidId,
  checkBody,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  '/:id/favorite',
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
