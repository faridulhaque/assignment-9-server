import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { TProfile, TProfileU, TRegUser } from "./user.interfaces";
import AppError from "../utils/appError";
const prisma = new PrismaClient();

// service function for create user

export const createUserService = async (data: TRegUser) => {
  const user = await prisma.user.findFirst({
    where: { username: data?.username },
  });

  if (user) {
    throw new AppError("prisma", {
      message: "username already exists",
    });
  }

  const result = await prisma.user.create({
    data: {
      username: data?.username,
      email: data?.email,
      password: data?.password,
    },
    select: {
      id: true,
      username: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

// service function for logging In

export const loginUserService = async (email: string, password: string) => {
  const foundUser = await prisma.user.findUnique({
    where: { email: email },
    select: {
      id: true,
      email: true,
      username: true,
      password: true,
    },
  });
  if (!foundUser) {
    throw new AppError("auth", {
      message: `There is no user with this email`,
    });
  }

  const isMatched = await bcrypt.compare(password, foundUser?.password);
  if (!isMatched) {
    throw new AppError("auth", {
      message: `Password did not match`,
    });
  }

  const token = jwt.sign(
    {
      id: foundUser?.id,
      email: foundUser?.email,
      
    },
    process.env.JWT_SECRET as string
  );

  const result = {
    email: foundUser?.email,
    id: foundUser?.id,
    token: token,
  };
  return result;
};

export const updateProfileService = async (userId: string, data: TProfileU) => {
  const result = await prisma.userProfile.update({
    where: {
      userId: userId,
    },
    data: data,
    include: {
      user: {
        select: {
          id: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  return result;
};

export const getProfileService = async (id: string) => {
  const user = await prisma.userProfile.findUnique({
    where: {
      userId: id,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  return user;
};
