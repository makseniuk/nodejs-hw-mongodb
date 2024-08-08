import createHttpError from 'http-errors';

const validateBody = (schema) => {
<<<<<<< Updated upstream
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(createHttpError(400, error.details[0].message));
    } else {
      next();
    }
  };
=======
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            next(createHttpError(400, error.details[0].message));
        } else {
            next();
        }
    };
>>>>>>> Stashed changes
};

export default validateBody;
