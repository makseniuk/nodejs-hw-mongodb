import { Contact } from "../db/Models/contactsModel.js";

const getAllContacts = async () => {
  try {
    const contacts = await Contact.find({});
    console.log("Fetched contacts: ", contacts); // Log les contacts récupérés
    return contacts;
  } catch (error) {
    throw new Error('Failed to fetch contacts: ' + error.message);
  }
};

const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

export { getAllContacts, getContactById };
