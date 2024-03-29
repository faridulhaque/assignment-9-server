import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(400).json({
    success: false,
    data: error,
  });
};
