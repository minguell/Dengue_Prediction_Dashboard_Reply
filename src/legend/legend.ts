import { GeoRoutes, legendColors, MonthDate } from "../../types/types";
import { getDistrictsMapInfo } from "../districts/districts";
import { isGoodTimeInterval } from "../dates/dates";
import { PrismaClient } from "@prisma/client";
import { getGradientLegend } from "../utils/colors";

export async function getLegendFromDates(route: GeoRoutes, beginDate: MonthDate, endDate: MonthDate): Promise<{
  color: string,
  name: string
}[]> {
  const prisma = new PrismaClient();

  if (!await isGoodTimeInterval(beginDate, endDate, prisma)) {
    await prisma.$disconnect();
    return [];
  }

  const districtsInfos = await getDistrictsMapInfo(route, beginDate, endDate);

  await prisma.$disconnect();

  return getGradientLegend(districtsInfos.minValue, districtsInfos.maxValue, legendColors);
}
