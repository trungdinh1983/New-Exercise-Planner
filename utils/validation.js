const Joi = require("joi");

const userValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password_digest: Joi.string().min(6).required(),
    deletedAt: Joi.date().allow(null),
  });
  return schema.validate(data);
};

module.exports = { userValidation };
