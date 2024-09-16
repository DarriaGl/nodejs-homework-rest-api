const { Errors } = require("../helpers/Errors");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      throw Errors(400, "missing fields");
    }
    const { error } = schema.validate(req.body);
    if (error) {
      next(Errors(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = { validateBody };
