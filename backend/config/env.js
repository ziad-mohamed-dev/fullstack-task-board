const Joi = require('joi');

// Environment variables validation schema
const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(5000),
  MONGO_URI: Joi.string().required(),
  JWT_SECRET: Joi.string().min(32).required(),
  VERCEL_PROJECT_PRODUCTION_URL: Joi.string().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
    otherwise: Joi.optional()
  })
}).unknown(); // Allow other environment variables

const validateEnv = () => {
  const { error, value } = envSchema.validate(process.env);
  if (error) {
    throw new Error(`Environment validation error: ${error.details[0].message}`);
  }
  return value;
};

module.exports = {
  validateEnv,
  envSchema
};
