import { Contact } from '../db/Models/contactsModel.js';

const getAllContacts = async (userId) => {
  const contacts = await Contact.find({ userId });
  return contacts;
};

const getContactById = async (id, userId) => {
  const contact = await Contact.findOne({ _id: id, userId });
  return contact;
};

const createContact = async (contactData) => {
  const newContact = new Contact(contactData);
  await newContact.save();
  return newContact;
};

const updateContact = async (contactId, updatedData, userId) => {
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    updatedData,
    { new: true },
  );
  return updatedContact;
};

const deleteContact = async (contactId, userId) => {
  const deletedContact = await Contact.findOneAndDelete({ _id: contactId, userId });
  return deletedContact;
};

export { getAllContacts, getContactById, createContact, updateContact, deleteContact };
