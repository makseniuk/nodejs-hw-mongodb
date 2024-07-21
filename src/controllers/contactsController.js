import { getAllContacts, getContactById as getContactByIdService } from '../services/contacts.js';

const getContacts = async (req, res) => {
  try {
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 'success',
      message: 'Successfully found contacts!',
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to get contacts',
      error: error.message
    });
  }
};

const getContactById = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactByIdService(contactId);

    if (!contact) {
      return res.status(404).json({
        status: 'error',
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: `Successfully found contact with id ${contactId}!`,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to get contact',
      error: error.message
    });
  }
};

export { getContacts, getContactById };
