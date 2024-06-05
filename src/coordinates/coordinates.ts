import { Districts, GeoJsonCoordinateInfos, GeoRoutes, MonthDate } from "../../types/types";
import { PrismaClient } from "@prisma/client";
import { isGoodTimeInterval } from "../dates/dates";
import { FeatureCollection } from "geojson";
import { getRealData } from "./real";
import { getPredictionData } from "./prediction";
import { getRandomCoordinates } from "../utils/coords";

export async function getCoordinatesGeoJson(route: GeoRoutes, beginDate: MonthDate, endDate: MonthDate) {
  const prisma = new PrismaClient();

  let result: {
    prediction: FeatureCollection & { properties: GeoJsonCoordinateInfos }
    real: FeatureCollection & { properties: GeoJsonCoordinateInfos }
  } = {
    prediction: {
      "type": "FeatureCollection",
      "properties": {
        name: "Dengue prediction diseases",
        maxQuantity: 0
      },
      "features": []
    },
    real: {
      "type": "FeatureCollection",
      "properties": {
        name: "Dengue real diseases",
        maxQuantity: 1
      },
      "features": []
    }
  };

  if (!await isGoodTimeInterval(beginDate, endDate, prisma)) {
    await prisma.$disconnect();
    return result;
  }


  const getReal = route === "full" || route === "real";
  const getPrediction = route === "full" || route === "prediction";

  if (getReal) {
    const realData = await getRealData(beginDate, endDate, prisma);
    realData.forEach((data) => {
      result.real?.features.push({
        "type": "Feature",
        "properties": data,
        "geometry": {
          "type": "Point",
          "coordinates": getRandomCoordinates(<Districts>data.districtName)
        }
      });
    });
  }

  if (getPrediction) {
    const predictionData = await getPredictionData(beginDate, endDate, prisma);
    predictionData.forEach((data) => {
      if (data.value > result.prediction.properties.maxQuantity)
        result.prediction.properties.maxQuantity = data.value;
      result.prediction?.features.push({
        "type": "Feature",
        "properties": data,
        "geometry": {
          "type": "Point",
          "coordinates": getRandomCoordinates(<Districts>data.districtName)
        }
      });
    });
  }

  await prisma.$disconnect();
  return result;
}