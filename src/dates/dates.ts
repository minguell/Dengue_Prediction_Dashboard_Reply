import { PrismaClient } from "@prisma/client";
import { Month, MonthDate } from "../../types/types";
import { endPrismaClient, getPrismaClient } from "../index";

export async function getExtremumYear(isMax: boolean, client ?: PrismaClient): Promise<number> {
  const prisma = getPrismaClient(client);

  const result = await prisma.realCase.findFirst({
    select: {
      year: true
    },
    orderBy: {
      year: (isMax) ? "desc" : "asc"
    }
  });

  const extremumYear = result?.year || 2000;

  await endPrismaClient(prisma, client);

  return extremumYear;
}

export function isGoodBeginYear(year: number, endYear: number, minYear: number) {
  return (year >= minYear && year <= endYear);
}

export function isGoodEndYear(year: number, beginYear: number, maxYear: number) {
  return (year <= maxYear && year >= beginYear);
}

export function isGoodBeginMonth(month: Month, isSameYear: boolean, endMonth: Month) {
  return (isSameYear && month <= endMonth) || !isSameYear;
}

export function isGoodEndMonth(month: Month, isSameYear: boolean, beginMonth: Month) {
  return (isSameYear && month >= beginMonth) || !isSameYear;
}

export async function isGoodTimeInterval(beginDate: MonthDate, endDate: MonthDate, client?: PrismaClient) {
  const prisma = getPrismaClient(client);
  const minYear = await getExtremumYear(false, prisma);
  const maxYear = await getExtremumYear(true, prisma);
  const isSameYear = beginDate.year === endDate.year;

  const areGoodMonths = isGoodBeginMonth(beginDate.month, isSameYear, endDate.month) && isGoodEndMonth(endDate.month, isSameYear, beginDate.month);
  const areGoodYears = isGoodBeginYear(beginDate.year, endDate.year, minYear) && isGoodEndYear(endDate.year, beginDate.year, maxYear);

  await endPrismaClient(prisma, client);

  return areGoodMonths && areGoodYears;
}