import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { TUser } from "./user.interfaces";
const prisma = new PrismaClient();

// service function for create user

export const createUserService = async (data: TUser) => {
  const { profile, ...user } = data;
  const result = await prisma.$transaction(async (transactionClient) => {
    const createUser = await transactionClient.user.create({ data: user });
    const userProfile = {
      ...profile,
      userId: createUser.id,
    };
    const createUserProfile = await transactionClient.userProfile.create({
      data: userProfile,
    });
  });

  return result;
};

// service function for logging In

export const loginUserService = async (email: string, password: string) => {
  const findUser = await prisma.user.findUnique({ where: { email: email } });
  if (!findUser) {
    console.log("error");
  }

  return null;
};

export const updateProfileService = async () => {};
