import Joi from "joi";

export const JoiLostItemSchema = Joi.object({
  categoryId: Joi.string().required(),
  isFound: Joi.boolean().optional(),
  imgUrl: Joi.string().optional(),
  phone: Joi.string().optional(),
  email: Joi.string().optional(),
  location: Joi.string().optional(),
  description: Joi.string().required(),
  lostDate: Joi.date().optional(),
});