import { PrismaClient } from "@prisma/client";
import { TClaim } from "./claim.interfaces";
import AppError from "../utils/appError";

const prisma = new PrismaClient();

export const makeClaimService = async (body: TClaim, userId: string) => {
  const newBody = {
    ...body,
    userId,
    status: "PENDING",
  };

  const result: any = await prisma.$transaction(async (transactionClient) => {
    try {
      const claim = await transactionClient.claim.create({
        data: newBody,
      });

      const userClaimConnection = await transactionClient.claim_user.create({
        data: {
          userId: userId,
          claimId: claim.id,
        },
      });

      return claim;
    } catch (error) {
      throw new AppError("PRISMA", error);
    }
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
              name: true,
              email: true,
              createdAt: true,
              password: true,
            },
          },
          foundItemCategory: true,
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
