import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import AppError from "./appError";

const prisma = new PrismaClient();

export const verifyJwt = async (token: string) => {
  const jwtDecoded: any = jwt.verify(
    token as string,
    process.env.JWT_SECRET as string
  );

  const { id, email } = jwtDecoded;
  const user = await prisma.user.findFirst({
    where: {
      email,
      id,
    },
  });
  if (!user) {
    throw new AppError("auth", {
      message:
        "You do not have the necessary permissions to access this resource.",
    });
  }

  return user;
};
