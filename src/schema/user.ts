import * as Joi from 'joi';

export const validateSignup = Joi.object({
  email: Joi.string().trim().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(6).max(11).required(),
  description: Joi.string().min(1).max(1000).required(),
  name: Joi.string().min(3).max(1000).required(),
});

export const validateLogin = Joi.object({
  email: Joi.string().trim().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(6).max(11).required(),
});

