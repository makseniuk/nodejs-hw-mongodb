import { Contact } from "../db/Models/contactsModel.js";

const getAllContacts = async () => {
  try {
    const contacts = await Contact.find({});
    return contacts;
  } catch (error) {
    throw new Error('Failed to fetch contacts: ' + error.message);
  }
};

export { getAllContacts };
