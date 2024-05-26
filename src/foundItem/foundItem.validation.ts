import Joi from "joi";
export const JoiFoundItemSchema = Joi.object({
  categoryId: Joi.string().required(),
  imgUrl: Joi.string().optional(),
  phone: Joi.string().optional(),
  email: Joi.string().optional(),
  location: Joi.string().required(),
  description: Joi.string().required(),
  foundDate: Joi.date().required(),
});



export const JoiItemFilterSchema = Joi.object({
  searchTerm: Joi.string().optional(),
  page: Joi.string().optional(),
  limit: Joi.string().optional(),
  foundItemName: Joi.string().optional(),
  sortBy: Joi.string()
    .valid("foundItemName", "category", "foundDate")
    .optional(),
  sortOrder: Joi.string().valid("asc", "desc").optional(),
});
