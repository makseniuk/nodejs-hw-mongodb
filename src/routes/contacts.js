import express from 'express';
import { getContacts, getContactById, createContact, updateContact, deleteContact } from '../controllers/contactsController.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';
<<<<<<< Updated upstream
import isValidId from '../middlewares/isValidId.js';
=======
import isValidId from "../middlewares/isValidId.js";
>>>>>>> Stashed changes
import { contactSchema, updateContactSchema } from '../validation/contactValidation.js';

const router = express.Router();

router.get('/', ctrlWrapper(getContacts));
router.get('/:contactId', isValidId, ctrlWrapper(getContactById));
router.post('/', validateBody(contactSchema), ctrlWrapper(createContact));
router.patch('/:contactId', isValidId, validateBody(updateContactSchema), ctrlWrapper(updateContact));
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContact));

export default router;
