import { Districts, MonthDate } from "../../types/types";
import { PrismaClient } from "@prisma/client";
import { endPrismaClient, getPrismaClient } from "../index";

export async function getPredictionData(beginDate: MonthDate, endDate: MonthDate, district: Districts, client?: PrismaClient){
  const prisma = getPrismaClient(client);
  const result = await prisma.predictedCase.aggregate({
    _sum: {
      value: true,
    },
    where: {
      AND: [
        { districtName: district},
        {
          OR: [
            {
              AND: [
                { year: beginDate.year },
                { month: { gte: beginDate.month } }
              ]
            },
            {
              year: { gt: beginDate.year }
            }
          ]
        },
        {
          OR: [
            {
              AND: [
                { year: endDate.year },
                { month: { lte: endDate.month } }
              ]
            },
            {
              year: { lt: endDate.year }
            }
          ]
        }
      ],
    },
  });

  await endPrismaClient(prisma, client);
  return result._sum.value ?? 0;
}