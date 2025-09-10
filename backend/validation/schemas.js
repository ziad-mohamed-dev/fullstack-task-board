const Joi = require('joi');

// Authentication schemas
exports.signupSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required()
    .messages({
      'string.alphanum': 'Username must only contain alphanumeric characters',
      'string.min': 'Username must be at least 3 characters long',
      'string.max': 'Username must be less than 30 characters long'
    }),
  password: Joi.string().min(8).max(128).required()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]'))
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password must be less than 128 characters long',
      'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
    })
});

exports.signinSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

// Board schemas

exports.boardSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  description: Joi.string().allow('').max(500)
});


exports.taskSchema = Joi.object({
  boardId: Joi.string().required(),
  name: Joi.string().min(1).max(100).required(),
  description: Joi.string().allow('').max(500),
  status: Joi.string().valid('To Do','In Progress','Completed','Won\'t Do','Other').required(),
  customStatus: Joi.when('status',{
    is: 'Other',
    then: Joi.string().min(1).max(100).required(),
    otherwise: Joi.string().allow('').max(100)
  }),
  icon: Joi.string().min(1).max(50).required()
});

exports.createTaskSchema = Joi.object({
  boardId: Joi.string().required()
});

exports.updateTaskSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  description: Joi.string().allow('').max(500),
  status: Joi.string().valid('To Do', 'In Progress', 'Completed', 'Won\'t Do', 'Other').required(),
  customStatus: Joi.when('status', {
    is: 'Other',
    then: Joi.string().min(1).max(100).required(),
    otherwise: Joi.string().allow('').max(100)
  }),
  icon: Joi.string().min(1).max(50).required()
});
