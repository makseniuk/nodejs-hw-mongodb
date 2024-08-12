import {
  getAllContacts,
  getContactById as getContactByIdService,
  createContact as createContactService,
  updateContact as updateContactService,
  deleteContact as deleteContactService
} from '../services/contacts.js';
import createHttpError from 'http-errors';

const getContacts = async (req, res) => {
  const contacts = await getAllContacts();
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts
  });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactByIdService(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact
  });
};

const createContact = async (req, res) => {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  if (!name || !phoneNumber || !contactType) {
    throw createHttpError(400, 'Name, phoneNumber, and contactType are required');
  }

  const newContact = await createContactService({ name, phoneNumber, email, isFavourite, contactType });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact
  });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const updatedData = req.body;

  const updatedContact = await updateContactService(contactId, updatedData);

  if (!updatedContact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact
  });
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await deleteContactService(contactId);

  if (!deletedContact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};

export { getContacts, getContactById, createContact, updateContact, deleteContact };

