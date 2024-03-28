import Joi from "joi";
export const JoiClaimSchema = Joi.object({
  foundItemId: Joi.string().required(),
  distinguishingFeatures: Joi.string().required(),
  lostDate: Joi.string().required(),
});
