import * as Joi from 'joi';

export const validateTransaction = Joi.object({
  amount: Joi.number().required(),
  source_address: Joi.string().required(),
  destination_address: Joi.string().required(),
  type: Joi.string()
    .trim()
    .valid(
      'transfer',
      'withdrawal',
    )
    .required(),
  currency: Joi.string()
    .trim()
    .valid(
      'bitcoin',
      'ethereum',
    )
    .required(),
});

