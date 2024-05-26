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
  const { searchTerm, page, limit, sortBy, sortOrder, foundItemName } = queries;

  const pageNumber = page ? page : 1;
  const limitTotal = limit ? limit : 10;

  const result = await prisma.foundItem.findMany({
    orderBy: [
      {
        [sortBy === "foundDate" ? "createdAt" : sortBy]: sortOrder,
      },
    ],
    where: {
      OR: searchTerm
        ? [
            {
              location: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          ]
        : [],
    },

    take: parseInt(limitTotal),
    skip: (parseInt(pageNumber) - 1) * parseInt(limitTotal),

    select: {
      id: true,
      location: true,
      description: true,
      createdAt: true,
      updatedAt: true,
      category: true,

      user: {
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      },
    },

    // include: {
    //   category: true,

    //   user: {
    //     select: {
    //       id: true,
    //       name: true,
    //       email: true,
    //       createdAt: true,
    //     },
    //   },
    // },
  });

  const response = {
    data: result,
    meta: {
      page: pageNumber,
      limit: limitTotal,
    },
  };

  return response;
};

export const getMyFoundItemsService = async (userId: string) => {
  return await prisma.foundItem.findMany({
    where: {
      userId: userId,
    },
    include: {
      category: true,
    },
  });
};
