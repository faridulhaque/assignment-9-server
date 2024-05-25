import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import { verifyJwt } from "../utils/verifyJWT";
import { JoiLostItemSchema } from "./lostItem.validation";
import {
  ReportLostItemService,
  getRecentLostItemService,
} from "./lostItem.services";

export const reportLostItem = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = JoiLostItemSchema.validate(req.body);

    if (error) {
      throw new AppError("JOI", error);
    }

    const user: any = await verifyJwt(req.headers.authorization as string);

    const result = await ReportLostItemService(value, user.id);
    res.status(201).json({
      success: true,
      statusCode: 201,
      data: result,
      message: "Lost item reported successfully",
    });
  }
);

export const getRecentLostItems = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await getRecentLostItemService();
    res.status(201).json({
      success: true,
      statusCode: 201,
      data: result,
      message: "Recent lost items retrieved successfully",
    });
  }
);
