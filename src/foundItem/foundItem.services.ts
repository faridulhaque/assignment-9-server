import { PrismaClient } from "@prisma/client";
import AppError from "../utils/appError";
import { TFoundItem } from "./foundItem.interfaces";

const prisma = new PrismaClient();

export const createFoundItemCategoryService = async (name: string) => {
  const category = await prisma.foundItemCategory.findFirst({
    where: { name: name },
  });
  if (category) {
    throw new AppError("prisma", {
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

export const getAllCategoryService = async () => {
  return await prisma.foundItemCategory.findMany();
};

export const ReportFoundItemService = async (body: any, userId: string) => {
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
      description: true,
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
// filtering found items
export const FilterFoundItemService = async (queries: any) => {
  const { categoryId, searchTerm } = queries;

  console.log(categoryId)
  console.log(searchTerm)

  const result = await prisma.foundItem.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      AND: [
        categoryId ? { categoryId } : {},

        searchTerm
          ? {
              OR: [
                { location: { contains: searchTerm, mode: "insensitive" } },
                { description: { contains: searchTerm, mode: "insensitive" } },
              ],
            }
          : {},
      ],
    },
    include: {
      category: true,
      user: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  });

  return result;
};

export const getMyFoundItemsService = async (userId: string) => {
  return await prisma.foundItem.findMany({
    where: {
      userId: userId,
      isDeleted: false,
    },
    include: {
      category: true,
    },
  });
};

export const updateFoundItemService = async (id: string, data: any) => {
  const result = await prisma.foundItem.update({
    where: {
      id,
    },
    data: data,
  });

  return result;
};

export const getFoundItemService = async (id: string) => {
  const item = await prisma.foundItem.findUnique({
    where: {
      id: id,
    },
    include: {
      category: true,
    },
  });

  return item;
};
