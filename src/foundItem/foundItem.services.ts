import { PrismaClient } from "@prisma/client";
import AppError from "../utils/appError";
import { TFoundItem } from "./foundItem.interfaces";

const prisma = new PrismaClient();

export const createFoundItemCategoryService = async (name: string) => {
  const category = await prisma.foundItemCategory.findFirst({
    where: { name: name },
  });
  if (category) {
    throw new AppError("UNIQUE", {
      message: "Category already exists",
    });
  }

  const result = await prisma.foundItemCategory.create({
    data: {
      name: name,
    },
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

export const ReportFoundItemService = async (
  body: TFoundItem,
  userId: string
) => {
  const newData = {
    ...body,
    userId,
  };

  const item = await prisma.foundItem.create({
    data: newData,
    select: {
      id: true,
      userId: true,
      categoryId: true,
      foundItemName: true,
      description: true,
      location: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  const category = await prisma.foundItemCategory.findUnique({
    where: {
      id: item.categoryId,
    },
    select: {
      id: true,
      name: true,
      updatedAt: true,
      createdAt: true,
    },
  });

  return {
    ...item,
    category,
    user,
  };
};
export const FilterFoundItemService = () => {};
