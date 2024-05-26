import { NextFunction, Request, Response } from "express";

import catchAsync from "../utils/catchAsync";
import {
  FilterFoundItemService,
  ReportFoundItemService,
  createFoundItemCategoryService,
  getAllCategoryService,
  getFoundItemService,
  getMyFoundItemsService,
  updateFoundItemService,
} from "./foundItem.services";
import {
  JoiFoundItemSchema,
  JoiItemFilterSchema,
} from "./foundItem.validation";
import AppError from "../utils/appError";
import { verifyJwt } from "../utils/verifyJWT";

// creating a foundItem category

export const createFoundItemCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await createFoundItemCategoryService(req.body.name);
    res.status(201).json({
      success: true,
      statusCode: 201,
      data: result,
      message: "Category created successfully",
    });
  }
);

export const getAllCategory = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getAllCategoryService();
    res.status(201).json({
      success: true,
      statusCode: 201,
      data: result,
      message: "categories retrieved successfully",
    });
  }
);

// Reporting a foundItem
export const reportFoundItem = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = JoiFoundItemSchema.validate(req.body);

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
  async (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = JoiItemFilterSchema.validate(req.query);
    if (error) {
      throw new AppError("JOI", error);
    }

    const response: any = await FilterFoundItemService(value as any);
    return res.status(201).json({
      success: true,
      statusCode: 201,
      data: response.data,
      meta: response.meta,
      message: "Found items retrieved successfully",
    });
  }
);

export const myFoundItem = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user: any = await verifyJwt(req.headers.authorization as string);

    const result = await getMyFoundItemsService(user.id);
    res.status(201).json({
      success: true,
      statusCode: 201,
      data: result,
      message: "Found items retrieved successfully",
    });
  }
);

export const updateFoundItem = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await verifyJwt(req.headers.authorization as string);
    const { value, error } = JoiFoundItemSchema.validate(req.body);
    if (error) {
      throw new AppError("JOI", error);
    }

    const result = await updateFoundItemService(req.params.id as string, value);
    return res.status(200).json({
      success: true,
      statusCode: 200,
      data: result,
      message: "Found item updated successfully",
    });
  }
);

export const getFoundItemController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await verifyJwt(req.headers.authorization as string);
    const result = await getFoundItemService(req.params.id);

    return res.status(200).json({
      success: true,
      statusCode: 200,
      data: result,
      message: "Item retrieved successfully",
    });
  }
);
