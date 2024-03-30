import Joi from "joi";
export const JoiFoundItemSchema = Joi.object({
  categoryId: Joi.string().required(),
  foundItemName: Joi.string().required(),
  location: Joi.string().required(),
  description: Joi.string().required(),
});



export const JoiItemFilterSchema = Joi.object({
  searchTerm: Joi.string().optional(),
  page: Joi.string().optional(),
  limit: Joi.string().optional(),
  foundItemName: Joi.string().optional(),
  sortBy: Joi.string().valid('foundItemName', 'category', 'lostDate').optional(),
  sortOrder: Joi.string().valid('asc', 'desc').optional(),
});