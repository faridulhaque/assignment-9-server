import { PrismaClient } from "@prisma/client";
import { TClaim } from "./claim.interfaces";
import AppError from "../utils/appError";

const prisma = new PrismaClient();

export const makeClaimService = async (body: any, userId: string) => {
  const claimed = await prisma.claim.findFirst({
    where: {
      userId: userId,
      foundItemId: body?.foundItemId,
    },
  });

  if (claimed) {
    throw new AppError("prisma", {
      message: "You have already made a claim",
    });
  }
  const result = await prisma.claim.create({
    data: {
      foundItemId: body?.foundItemId,
      userId: userId,
    },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

export const getClaimsService = async () => {
  return await prisma.claim.findMany({
    include: {
      FoundItem: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              email: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          category: true,
        },
      },
    },
  });
};

export const getMyClaimsService = async (id: string) => {
  return await prisma.claim.findMany({
    where: {
      userId: id,
    },
    include: {
      FoundItem: {
        include: {
          category: true,
        },
      },
    },
  });
};

export const updateClaimService = async (status: string, claimId: string) => {
  const result = await prisma.claim.update({
    where: {
      id: claimId,
    },
    data: {
      status: status,
    },
  });

  return result;
};
