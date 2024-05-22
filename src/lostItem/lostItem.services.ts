import {PrismaClient } from "@prisma/client";
import { TLostItem } from "./lostItem.interfaces";
const prisma = new PrismaClient();


export const ReportFoundItemService = async (
    body: TLostItem,
    userId: string
  ) => {
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
        lostItemName: true,
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