import { NextFunction, Request, Response } from "express";
import { createUserService, loginUserService } from "./user.services";
import bcrypt from "bcrypt";
import catchAsync from "../utils/catchAsync";

// creating a user

export const registerUserController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

// user logging in controller
export const userLoginController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);
// update profile
export const updateProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);
