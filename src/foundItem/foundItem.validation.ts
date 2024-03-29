import Joi from "joi";
export const JOiFoundItemSchema = Joi.object({
  categoryId: Joi.string().required(),
  foundItemName: Joi.string().required(),
  location: Joi.string().required(),
  description: Joi.string().required(),
});
