import { NextFunction, Request, Response } from "express";

import catchAsync from "../utils/catchAsync";
import {
  ReportFoundItemService,
  createFoundItemCategoryService,
} from "./foundItem.services";
import { JOiFoundItemSchema } from "./foundItem.validation";
import AppError from "../utils/appError";
import { TUser } from "../user/user.interfaces";
import { verifyJwt } from "../utils/verifyJWT";

// creating a foundItem category

export const createFoundItemCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await createFoundItemCategoryService(req.body.name);
    res.status(201).json({
      success: true,
      statusCode: 201,
      data: result,
      message: "Found item category created successfully",
    });
  }
);

// Reporting a foundItem
export const reportFoundItem = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = JOiFoundItemSchema.validate(req.body);

    if (error) {
      throw new AppError("JOI", error);
    }

    const user: any = await verifyJwt(req.headers.authorization as string);

    const result = await ReportFoundItemService(value, user.id);
    res.status(201).json({
      success: true,
      statusCode: 201,
      data: result,
      message: "Found item reported successfully",
    });
  }
);

// filtering found item
export const filterFoundItem = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);
