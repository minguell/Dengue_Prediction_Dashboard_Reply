import {
  diffLegendColors,
  districtBorders,
  DistrictData,
  DistrictMapInfo,
  Districts,
  GeoJsonDistrictInfos,
  GeoRoutes, legendColors,
  MonthDate
} from "../../types/types";
import { PrismaClient } from "@prisma/client";
import district from "./poa_districts.json";
import { Feature, FeatureCollection, MultiPolygon, Polygon } from "geojson";
import { isGoodTimeInterval } from "../dates/dates"
import { endPrismaClient, getPrismaClient } from "../index";
import { getPredictionData } from "./prediction";
import { getGradientLegend, getGradientValue } from "../utils/colors";
import { getRealData } from "./real";

export async function getDistrictsGeoJson(route: GeoRoutes, beginDate: MonthDate, endDate: MonthDate, geometry: boolean){
  const prisma = new PrismaClient();
  let geojson: FeatureCollection & { properties: GeoJsonDistrictInfos }= {
    "type": "FeatureCollection",
    "properties": {
      name: "Distritos de Saúde",
      id: Math.floor(Math.random()*1000000000000),
      legend: [],
      maxValue: -1,
      minValue: -1,
      maxDiff: -1,
    },
    "features": []
  };
  if (!await isGoodTimeInterval(beginDate, endDate, prisma)){
      await prisma.$disconnect();
      return geojson;
  }

  const districtsInfos = await getDistrictsMapInfo(route, beginDate, endDate, prisma);



  district.features.forEach((district) => {
    let feature: Feature<MultiPolygon | Polygon> = {
      "type": "Feature",
      "properties": districtsInfos.data[district.properties.name],
      "geometry": (geometry)? <MultiPolygon | Polygon>district.geometry : {type: "Polygon", coordinates: []}
    }
    geojson.features.push(feature);
  })

  geojson.properties.maxValue = districtsInfos.maxValue;
  geojson.properties.minValue = districtsInfos.minValue;
  geojson.properties.maxDiff = districtsInfos.maxDiff;
  geojson.properties.legend = getGradientLegend(districtsInfos.minValue, districtsInfos.maxValue, legendColors)
  geojson.properties.diffLegend = getGradientLegend(0, districtsInfos.maxDiff, diffLegendColors);
  await prisma.$disconnect();
  return geojson;
}

export async function getDistrictsMapInfo(route: GeoRoutes, beginDate: MonthDate, endDate: MonthDate, client?: PrismaClient){
  const prisma = getPrismaClient(client);
  const districts = await prisma.district.findMany({})
  const infos: {[p: string]: DistrictMapInfo} = {};
  let minValue = Infinity;
  let maxValue = 0;
  let maxDiff = 0;
  const getReal = route === "full" || route === "real";
  const getPrediction = route === "full" || route === "prediction";

  for (const districtData of districts) {
    infos[districtData.name] = {
      name: <Districts>districtData.name,
      borderColor: districtBorders[districtData.name],
    }
    if (route === "full"){
      const predDiseases = await getPredictionData(beginDate, endDate, <Districts>districtData.name,prisma);
      const realDiseases = await getRealData(beginDate, endDate, <Districts>districtData.name,prisma);
      const diseases = (predDiseases > realDiseases) ? predDiseases : realDiseases;
      minValue = (diseases < minValue) ? diseases : minValue;
      maxValue = (diseases > maxValue) ? diseases : maxValue;
      maxDiff = (Math.abs(predDiseases - realDiseases) > maxDiff) ? Math.abs(predDiseases - realDiseases) : maxDiff
      infos[districtData.name].predictionData = {
        value: predDiseases,
        color: "#FFFFFF"
      }
      infos[districtData.name].realData = {
        value: realDiseases,
        color: "#FFFFFF"
      }
      infos[districtData.name].diffData = {
        value: Math.abs(predDiseases - realDiseases),
        color: "#FFFFFF"
      }
    }else{
      if (getPrediction){
        const diseases = await getPredictionData(beginDate, endDate, <Districts>districtData.name,prisma);
        minValue = (diseases < minValue) ? diseases : minValue;
        maxValue = (diseases > maxValue) ? diseases : maxValue;
        infos[districtData.name].predictionData = {
          value: diseases,
          color: "#FFEDA0"
        }
      }

      if (getReal){
        const diseases = await getRealData(beginDate, endDate, <Districts>districtData.name,prisma);
        minValue = (diseases < minValue) ? diseases : minValue;
        maxValue = (diseases > maxValue) ? diseases : maxValue;
        infos[districtData.name].realData = {
          value: diseases,
          color: "#FFEDA0"
        }
      }
    }


  }

  for (const districtData of districts) {

    if (getPrediction){
      const data = <DistrictData>infos[districtData.name].predictionData
      data.color = getGradientValue(data.value, minValue, maxValue, legendColors);
    }

    if (getReal){
      const data = <DistrictData>infos[districtData.name].realData
      data.color = getGradientValue(data.value, minValue, maxValue, legendColors);
    }

    if (route === "full"){
      const data = <DistrictData>infos[districtData.name].diffData
      data.color = getGradientValue(data.value, 0, maxDiff, diffLegendColors)
    }
  }

  await endPrismaClient(prisma, client);
  return {
    data: infos,
    minValue: minValue,
    maxValue: maxValue,
    maxDiff: maxDiff,
  }
}