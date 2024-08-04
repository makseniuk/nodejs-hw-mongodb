import { Contact } from "../db/Models/contactsModel.js";

const getAllContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const getContactById = async (id) => {
  const contacts = await Contact.findById(id);
  return contacts;
};

export { getAllContacts, getContactById };
