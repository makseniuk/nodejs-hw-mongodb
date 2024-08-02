import {Contact} from '../db/models/contactsModel.js';

const getAllContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

export { getAllContacts, getContactById };
