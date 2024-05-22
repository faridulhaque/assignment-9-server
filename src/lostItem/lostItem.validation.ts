import Joi from "joi";

export const JoiFoundItemSchema = Joi.object({
    categoryId: Joi.string().required(),
    lostItemName: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
  })