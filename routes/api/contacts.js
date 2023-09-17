const express = require('express');

const ctrl = require('../../controllers/contacts');

const schemas = require('../../models/contact');

const {
  validateBody,
  checkBody,
  isValidId,
  authenticate,
} = require('../../middlewares');

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
