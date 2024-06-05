import { inspection, inspectionMosquito, PrismaClient, trap } from "@prisma/client";
import { GeoJsonMosquitoInfos, WeekDate } from "../../types/types";
import { endPrismaClient, getPrismaClient } from "../index";
import { FeatureCollection, Point } from "geojson";


export async function getUniqueTrapsWithCoordinates() {
  const prisma = new PrismaClient();
  try {
    const traps = await prisma.trap.findMany();
    const len = traps.length;
    console.log(len);

    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        if (traps[i].id !== traps[j].id && traps[i].latitude === traps[j].latitude && traps[i].longitude === traps[j].longitude) {
          console.log(traps[i], traps[j]);
        }
      }
    }

    return traps;
  } catch (error) {
    console.error("Une erreur s'est produite lors de la récupération des données :", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function getMosquitoTrapData(beginWeek: WeekDate, endWeek: WeekDate, client?: PrismaClient) {
  const prisma = getPrismaClient(client);
  const result: ({ inspection: (inspection & { inspectionMosquito: inspectionMosquito[] })[] } & trap)[] = [];
  const traps = await prisma.trap.findMany();

  let maxQuantity = 0;

  for (const trap of traps) {
    const trapInspections = await prisma.trap.findUnique({
      where: { id: trap.id },
      include: {
        inspection: {
          include: {
            inspectionMosquito: {
              where: {
                quantity: { gt: 0 }
              }
            }
          },
          where: {
            AND: [
              { year: { gte: beginWeek.year } },
              { year: { lte: endWeek.year } },
              {
                OR: [
                  { AND: [{ year: { gt: beginWeek.year } }, { year: { lt: endWeek.year } }] },
                  { year: beginWeek.year, week: { gte: beginWeek.week } },
                  { year: endWeek.year, week: { lte: endWeek.week } }
                ]
              }
            ]
          }
        }
      }
    });

    if (trapInspections && trapInspections.inspection.length > 0) {
      let isMosquito = false;
      trapInspections.inspection.forEach((inspection) => {
        inspection.inspectionMosquito.forEach((mosquito) => {
          if (mosquito.quantity > 0)
            isMosquito = true;
          if (mosquito.quantity > maxQuantity)
            maxQuantity = mosquito.quantity;
        });
      });
      if (isMosquito)
        result.push(trapInspections);
    }

  }

  await endPrismaClient(prisma, client);
  return result
}

export async function getMosquitoesTrapGeoJson(beginWeek: WeekDate, endWeek: WeekDate) {
  const prisma = new PrismaClient();

  const mosquitoData = await getMosquitoTrapData(beginWeek, endWeek, prisma);

  let result: FeatureCollection<Point> & { properties: GeoJsonMosquitoInfos } = {
    "type": "FeatureCollection",
    "properties": {
      name: "Mosquito data by trap",
      maxQuantity: 0
    },
    "features": []
  };

  mosquitoData.forEach((data) => {
    const quantity = getQuantityInspections(data.inspection);
    if (quantity > result.properties.maxQuantity)
      result.properties.maxQuantity = quantity;
    result.features.push({
      "type": "Feature",
      "properties": {
        trap_id: data.id,
        quantity: quantity,
        // inspections: data.inspection
      },
      "geometry": {
        "type": "Point",
        "coordinates": [parseFloat(data.latitude), parseFloat(data.longitude)]
      }
    });
  });

  return result;
}

function getQuantityInspections(inspections: (inspection & { inspectionMosquito: inspectionMosquito[] })[]) {
  let result = 0;
  inspections.forEach((inspection) => {
    inspection.inspectionMosquito.forEach((mosquito) => {
      result += mosquito.quantity;
    });
  });
  return result;
}