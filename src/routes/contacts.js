import express from 'express';
import { getContacts, getContactById, createContact, updateContact, deleteContact } from '../controllers/contactsController.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.get('/', ctrlWrapper(getContacts));
router.get('/:contactId', ctrlWrapper(getContactById));

router.post("/", upload.single('photo'), ctrlWrapper(createContact));
router.patch("/:contactId", upload.single('photo'), ctrlWrapper(updateContact));
router.delete("/:contactId", ctrlWrapper(deleteContact));

export default router;
