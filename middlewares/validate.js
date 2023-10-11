const { Errors } = require("../helpers/Errors");

const validate = (schema) => {
  const func = (req, res, next) => {
    if (!Object.keys(req.body).length) {
      return next(Errors(400, "missing fields"));
    }
    const { error } = schema.validate(req.body);

    if (error && Object.keys(req.body).length < 3) {
      const nameField = error.details[0].path[0];
      return next(Errors(400, `missing required ${nameField} field`));
    }
    if (error && Object.keys(req.body).length === 3) {
      const nameField = error.details[0].path[0];
      let message;
      switch (nameField) {
        case "name":
          message =
            "The name should only contain letters, spaces, hyphens, and apostrophes, and should not exceed 25 characters.";
          break;
        case "email":
          message = "Please enter a valid email address.";
          break;
        case "phone":
          message = "The phone number should be in the format (XXX) XXX-XXXX.";
          break;
      }
      return next(Errors(400, `Invalid ${nameField} field format. ${message}`));
    }
    next();
  };
  return func;
};

module.exports = { validate };
