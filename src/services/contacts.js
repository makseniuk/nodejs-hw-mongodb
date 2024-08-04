import { Contact } from "../db/Models/contactsModel.js";

const getAllContacts = async () => {
  return await Contact.find({Contact});
};

const getContactById = async (id) => {
  return await Contact.findById(id);
};

export { getAllContacts, getContactById };
