import {
  getAllContacts,
  getContactById as getContactByIdService,
  createContact as createContactService,
  updateContact as updateContactService,
  deleteContact as deleteContactService,
} from '../services/contacts.js';
import createHttpError from 'http-errors';

const getContacts = async (req, res) => {
  const { page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc' } = req.query;
  const pageNumber = parseInt(page, 10);
  const perPageNumber = parseInt(perPage, 10);
  const sortDirection = sortOrder === 'desc' ? -1 : 1;

  const totalItems = await getAllContacts(req.user._id).countDocuments();

  const contacts = await getAllContacts(req.user._id)
    .sort({ [sortBy]: sortDirection })
    .skip((pageNumber - 1) * perPageNumber)
    .limit(perPageNumber);

  const totalPages = Math.ceil(totalItems / perPageNumber);

  res.status(200).json({
    status: 'success',
    message: 'Successfully found contacts!',
    data: {
      data: contacts,
      page: pageNumber,
      perPage: perPageNumber,
      totalItems,
      totalPages,
      hasPreviousPage: pageNumber > 1,
      hasNextPage: pageNumber < totalPages,
    },
  });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactByIdService(contactId, req.user._id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 'success',
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

const createContact = async (req, res) => {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;
  const userId = req.user._id;

  if (!name || !phoneNumber || !contactType) {
    throw createHttpError(400, 'Name, phoneNumber, and contactType are required');
  }

  const newContact = await createContactService({ name, phoneNumber, email, isFavourite, contactType, userId });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const updatedData = req.body;

  const updatedContact = await updateContactService(contactId, updatedData, req.user._id);

  if (!updatedContact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 'success',
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await deleteContactService(contactId, req.user._id);

  if (!deletedContact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};

export { getContacts, getContactById, createContact, updateContact, deleteContact };
