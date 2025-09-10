// eslint-disable-next-line no-unused-vars
const Joi = require('joi');

exports.validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    next();
  };
};
