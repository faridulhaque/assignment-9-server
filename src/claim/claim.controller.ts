import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import {
  getClaimersService,
  getClaimsService,
  getMyClaimsService,
  makeClaimService,
  updateClaimService,
} from "./claim.service";
import { JoiClaimSchema } from "./claim.validation";
import AppError from "../utils/appError";
import { verifyJwt } from "../utils/verifyJWT";
import { noAdminError } from "../user/user.controller";

export const createClaim = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = JoiClaimSchema.validate(req.body);

    if (error) {
      throw new AppError("JOI", error);
    }

    const user: any = await verifyJwt(req.headers.authorization as string);

    const result = await makeClaimService(value, user?.id);

    return res.status(201).json({
      success: true,
      statusCode: 201,
      data: result,
      message: "Claim created successfully",
    });
  }
);
export const updateClaim = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await verifyJwt(req.headers.authorization as string);
    const result = await updateClaimService(
      req.body.status as string,
      req.params.claimId as string
    );

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Claim updated successfully",
      data: result,
    });
  }
);

export const getClaim = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await verifyJwt(req.headers.authorization as string);
    noAdminError(user);

    const claims = await getClaimsService();

    res.status(200).json({
      success: true,
      statusCode: 201,
      message: "Claims retrieved successfully",
      data: claims,
    });
  }
);

export const getMyClaim = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user: any = await verifyJwt(req.headers.authorization as string);

    const claims = await getMyClaimsService(user?.id);

    res.status(200).json({
      success: true,
      statusCode: 201,
      message: "Claims retrieved successfully",
      data: claims,
    });
  }
);

export const getClaimers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await verifyJwt(req.headers.authorization as string);
    noAdminError(user);

    const claimers = await getClaimersService(req.params.id as string);

    res.status(200).json({
      success: true,
      statusCode: 201,
      message: "Claimers retrieved successfully",
      data: claimers,
    });
  }
);
