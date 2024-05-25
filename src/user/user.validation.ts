import Joi from "joi";

const JoiProfileSchema = Joi.object({
  bio: Joi.string().required(),
  age: Joi.number().integer().min(18).required(),
});

export const JoiUserRegistrationSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const JoiLoginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const JoiUpdateProfileSchema = Joi.object({
  bio: Joi.string().required(),
  age: Joi.number().integer().min(18).required(),
});
