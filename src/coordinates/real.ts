import { MonthDate } from "../../types/types";
import { PrismaClient } from "@prisma/client";
import { endPrismaClient, getPrismaClient } from "../index";

export async function getRealData(beginDate: MonthDate, endDate: MonthDate, client?: PrismaClient) {
  const prisma = getPrismaClient(client);

  const result = await prisma.realCase.findMany({
    select: {
      year: false,
      month: false,
      id: true,
      districtName: true
    },
    where: {
      AND: [
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
      ]
    }
  });

  await endPrismaClient(prisma, client);
  return result
}