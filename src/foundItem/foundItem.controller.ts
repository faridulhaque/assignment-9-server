import { NextFunction, Request, Response } from "express";

import catchAsync from "../utils/catchAsync";

// creating a foundItem category

export const createFoundItemCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

// Reporting a foundItem
export const reportFoundItem = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

// filtering found item
export const filterFoundItem = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);
