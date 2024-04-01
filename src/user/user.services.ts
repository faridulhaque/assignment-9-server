import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { TProfile, TProfileU, TUser } from "./user.interfaces";
import AppError from "../utils/appError";
const prisma = new PrismaClient();

// service function for create user

export const createUserService = async (data: TUser) => {
  const { profile, ...user } = data;

  const result = await prisma.$transaction(async (transactionClient) => {
    try {
      const createUser = await transactionClient.user.create({
        data: user,
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      const userProfile = {
        ...profile,
        userId: createUser.id,
      };
      const createUserProfile = await transactionClient.userProfile.create({
        data: userProfile,
        select: {
          id: true,
          userId: true,
          bio: true,
          age: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return {
        ...createUser,
        profile: createUserProfile,
      };
    } catch (error) {
      throw new AppError("prisma", error);
    }
  });

  return result;
};

// service function for logging In

export const loginUserService = async (email: string, password: string) => {
  const foundUser = await prisma.user.findUnique({
    where: { email: email },
    select: {
      id: true,
      name: true,
      email: true,
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
      iat: Math.floor(Date.now()),
      exp: Math.floor(Date.now()),
    },
    process.env.JWT_SECRET as string
  );

  const result = {
    name: foundUser?.name,
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
          name: true,
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
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  return user;
};
