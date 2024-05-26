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
      isBanned: true,
      isAdmin: true,
    },
  });
  if (!foundUser) {
    throw new AppError("auth", {
      message: `There is no user with this email`,
    });
  }
  if (foundUser.isBanned) {
    throw new AppError("auth", {
      message: `User was banned from this site`,
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

export const updateProfileService = async (id: string, data: any) => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: data,
  });

  return result;
};

export const getProfileService = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      username: true,
      id: true,
      email: true,
    },
  });

  return user;
};

export const changePasswordService = async (data: any, id: string) => {
  const user: any = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      password: true,
    },
  });

  const isMatched = await bcrypt.compare(data.oldPassword, user?.password);
  if (!isMatched) {
    throw new AppError("auth", {
      message: `Incorrect old password`,
    });
  }

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(data?.newPassword, salt);

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: {
      password: passwordHash,
    },
  });

  return result;
};

export const getUsersService = async () => {
  const user = await prisma.user.findMany({
    select: {
      username: true,
      id: true,
      email: true,
      isAdmin: true,
      isBanned: true,
    },
  });

  return user;
};
