import Joi from "joi";
export const JoiClaimSchema = Joi.object({
  foundItemId: Joi.string().required(),
});
