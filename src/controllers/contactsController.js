import { getAllContacts, getContactById as getContactByIdService } from '../services/contacts.js';
import createError from 'http-errors';

const getContacts = async (req, res) => {
  const contacts = await getAllContacts();
  res.status(200).json({
    status: 'success',
    message: 'Successfully found contacts!',
    data: contacts
  });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactByIdService(contactId);

  if (!contact) {
    throw createError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 'success',
    message: `Successfully found contact with id ${contactId}!`,
    data: contact
  });
};

export { getContacts, getContactById };
