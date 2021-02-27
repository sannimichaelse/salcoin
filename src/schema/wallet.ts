import * as Joi from 'joi';

export const validateWallet = Joi.object({
  amount: Joi.number().required(),
  currency: Joi.string()
    .trim()
    .valid(
      'bitcoin',
      'ethereum',
    )
    .required(),
});

