import { Contact } from "../db/Models/contactsModel.js";

const getAllContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const getContactById = async (id) => {
  const contacts = await Contact.findById(id);
  return contacts;
};

const createContact = async (contactData) => {
  const newContact = new Contact(contactData);
  await newContact.save();
  return newContact;
};

const updateContact = async (contactId, updatedData) => {
  const updatedContact = await Contact.findByIdAndUpdate(contactId, updatedData, { new: true });
  return updatedContact;
};

const deleteContact = async (contactId) => {
  const deletedContact = await Contact.findByIdAndDelete(contactId);
  return deletedContact;
};

export { getAllContacts, getContactById, createContact, updateContact, deleteContact };

