import Joi from "joi";

export const propertySchema = Joi.object().keys({
  ownerName: Joi.string().required(),
  location: Joi.string().required(),
  image: Joi.string().required(),
  type: Joi.string().required(),
  propertyStatus: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  ownerId: Joi.string(),
});
export const PaymentSchema = Joi.object().keys({
  _id: Joi.string().required(),
  reference: Joi.string().required(),
});

export const updatePropertySchema = Joi.object().keys({
  ownerName: Joi.string(),
  location: Joi.string(),
  image: Joi.string(),
  type: Joi.string(),
  propertyStatus: Joi.string(),
  price: Joi.number(),
  description: Joi.string(),
});
