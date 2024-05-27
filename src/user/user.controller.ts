import { NextFunction, Request, Response } from "express";
import {
  changePasswordService,
  createUserService,
  getProfileService,
  getUsersService,
  loginUserService,
  updateProfileService,
} from "./user.services";
import bcrypt from "bcrypt";
import catchAsync from "../utils/catchAsync";
import {
  JoiLoginUserSchema,
  JoiUpdateProfileSchema,
  JoiUserRegistrationSchema,
  joiChangePassword,
} from "./user.validation";
import AppError from "../utils/appError";
import { verifyJwt } from "../utils/verifyJWT";

// creating a user

export const registerUserController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = JoiUserRegistrationSchema.validate(req.body);

    if (error) {
      throw new AppError("JOI", error);
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(req?.body?.password, salt);
    value.password = passwordHash;

    const result: any = await createUserService(value);

    res.status(200).json({
      success: true,
      statusCode: 201,
      message: "User registered successfully",
      data: result,
    });
  }
);

// user logging in controller
export const userLoginController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = JoiLoginUserSchema.validate(req.body);
    if (error) {
      throw new AppError("JOI", error);
    }
    const result = await loginUserService(value?.email, value?.password);

    return res.status(200).json({
      success: true,
      statusCode: 200,
      data: result,
      message: "User logged in successfully",
    });
  }
);
// update profile
export const updateProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await verifyJwt(req.headers.authorization as string);
    const { value, error } = JoiUpdateProfileSchema.validate(req.body);
    if (error) {
      throw new AppError("JOI", error);
    }

    const result = await updateProfileService(user?.id as string, value);
    return res.status(200).json({
      success: true,
      statusCode: 200,
      data: result,
      message: "User profile updated successfully",
    });
  }
);

export const banUserController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await verifyJwt(req.headers.authorization as string);
    noAdminError(user);

    const result = await updateProfileService(req?.body?.id as string, {
      isBanned: req?.body?.isBanned,
    });
    return res.status(200).json({
      success: true,
      statusCode: 200,
      data: result,
      message: "User banned successfully",
    });
  }
);

// get my profile
export const getProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await verifyJwt(req.headers.authorization as string);
    const result = await getProfileService(user?.id);

    return res.status(200).json({
      success: true,
      statusCode: 200,
      data: result,
      message: "Profile retrieved successfully",
    });
  }
);
export const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await verifyJwt(req.headers.authorization as string);
    noAdminError(user);

    const result = await getUsersService();

    return res.status(200).json({
      success: true,
      statusCode: 200,
      data: result,
      message: "users retrieved successfully",
    });
  }
);

export const changePassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await verifyJwt(req.headers.authorization as string);
    const { value, error } = joiChangePassword.validate(req.body);
    if (error) {
      throw new AppError("JOI", error);
    }
    const result = await changePasswordService(value, user?.id);

    return res.status(200).json({
      success: true,
      statusCode: 200,
      data: null,
      message: "Password changed successfully",
    });
  }
);

const noAdminError = (user: any) => {
  if (user?.isAdmin === true) {
    throw new AppError("auth", {
      message:
        "You do not have the necessary permissions to access this resource.",
    });
  }
};
