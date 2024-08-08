<<<<<<< Updated upstream
import mongoose from 'mongoose';
import createHttpError from 'http-errors';

const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    next(createHttpError(400, 'Invalid ID'));
  } else {
    next();
  }
=======
import mongoose from "mongoose";
import createHttpError from "http-errors";

const isValidId = (req, res, next) => {
    const { contactId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(contactId)) {
        next(createHttpError(400, "Invalid ID"));
    } else {
        next();
    }
>>>>>>> Stashed changes
};

export default isValidId;
