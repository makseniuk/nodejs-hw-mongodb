import { cloudinary } from '../config/cloudinary.js';
import { Contact } from '../db/Models/contactsModel.js';
import {
  getAllContacts,
  getContactById as getContactByIdService,
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

const createContact = async (req, res, next) => {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;
  const userId = req.user._id;
  let photoUrl = null;

  if (req.file) {
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    photoUrl = result.secure_url;
  }

  try {
    const newContact = new Contact({
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
      userId,
      photo: photoUrl,
    });

    await newContact.save();

    res.status(201).json({
      status: 'success',
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};

const handleUpdateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedData = req.body;

  if (req.file) {
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    updatedData.photo = result.secure_url;
  }

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      updatedData,
      { new: true }
    );

    if (!updatedContact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 'success',
      message: 'Successfully updated a contact!',
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await deleteContactService(contactId, req.user._id);

  if (!deletedContact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};

export { getContacts, getContactById, createContact, handleUpdateContact as updateContact, deleteContact };
