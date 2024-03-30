import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { errorType, errorSource } = err;

  if (errorType === "JOI") {
    // if the error is related to JOI
    const { errorMessage, error } = handleJoiError(errorSource);
    res.status(400).json({ success: false, message: errorMessage, error });
  } else if (errorType === "auth") {
    res.status(400).json({
      success: false,
      message: errorSource?.message,
      error: err,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};

const handleJoiError = (errorSource: any) => {
  const allErrors = errorSource.details.map((detail: any) => detail.message);

  const issues = errorSource.details.map((detail: any) => ({
    path: detail.path,
    expected: detail.type,
    received: detail.value,
  }));

  return {
    errorMessage: allErrors,
    error: {
      errorDetails: {
        name: "JoiError",
        issues: issues,
      },
      stack: errorSource?.stack,
    },
  };
};
