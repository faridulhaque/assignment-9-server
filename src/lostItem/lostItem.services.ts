import { PrismaClient } from "@prisma/client";
import { TLostItem } from "./lostItem.interfaces";
const prisma = new PrismaClient();

export const ReportLostItemService = async (body: any, userId: string) => {
  const newData = {
    ...body,
    userId,
  };

  const item = await prisma.lostItem.create({
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

export const getRecentLostItemService = async () => {
  const items = await prisma.lostItem.findMany({
    where: {
      isDeleted: false,
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 12,
  });

  return items;
};

export const getMyLostItemsService = async (userId: string) => {
  return await prisma.lostItem.findMany({
    where: {
      userId,
      isDeleted: false,
    },
    include: {
      category: true,
    },
  });
};

export const updateLostItemService = async (id: string, data: any) => {
  const result = await prisma.lostItem.update({
    where: {
      id,
    },
    data: data,
  });

  return result;
};

export const getLostItemService = async (id: string) => {
  const item = await prisma.lostItem.findUnique({
    where: {
      id: id,
    },
    include: {
      category: true,
    },
  });

  return item;
};
