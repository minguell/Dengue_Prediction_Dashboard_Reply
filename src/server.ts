import express from "express";
import cors from "cors";
import { getExtremumYear, isGoodTimeInterval } from "./dates/dates";
import { PrismaClient } from "@prisma/client";
import { getDistrictsGeoJson } from "./districts/districts";
import { GeoRoutes } from "../types/types";
import { getCoordinatesGeoJson } from "./coordinates/coordinates";
import { getLegendFromDates } from "./legend/legend";
import { getMosquitoesTrapGeoJson, getUniqueTrapsWithCoordinates } from "./mosquitoes";

const app = express();
app.use(express.json());
app.use(cors());
app.get("/", async (_req: any, res: any) => {
  const prisma = new PrismaClient();
  console.log(await getExtremumYear(true, prisma));
  console.log(await getExtremumYear(false, prisma));
  await prisma.$disconnect();
  res.send("it works");
});


app.post("/district/:value", async (req: any, res: any) => {
  const districtReq = req.params.value;
  if (!(districtReq === "full" || districtReq === "prediction" || districtReq === "real")) {
    res.send("Not a good option for this route");
    return;
  }
  const { beginDate, endDate, geometry } = req.body;
  res.json(await getDistrictsGeoJson(<GeoRoutes>districtReq, beginDate, endDate, geometry));
});

app.post("/coordinate/:value", async (req: any, res: any) => {
  const districtReq = req.params.value;
  if (!(districtReq === "full" || districtReq === "prediction" || districtReq === "real")) {
    res.send("Not a good option for this route");
    return;
  }
  const { beginDate, endDate } = req.body;
  res.json(await getCoordinatesGeoJson(<GeoRoutes>districtReq, beginDate, endDate));
});

app.post("/legend/:value", async (req: any, res: any) => {
  const districtReq = req.params.value;
  if (!(districtReq === "full" || districtReq === "prediction" || districtReq === "real")) {
    res.send("Not a good option for this route");
    return;
  }
  const { beginDate, endDate } = req.body;
  res.json(await getLegendFromDates(<GeoRoutes>districtReq, beginDate, endDate));
});

app.post("/dates", async (req: any, res: any) => {
  const { beginDate, endDate } = req.body;
  res.send(await isGoodTimeInterval(beginDate, endDate));
});

app.get("/dates/:value", async (req: any, res: any) => {
  const value = req.params.value;
  const prisma = new PrismaClient();

  switch (value){
    case "max":
      const max = await getExtremumYear(true, prisma);
      res.status(200).json({
        max: max
      });
      break;
    case "min":
      const min = await getExtremumYear(false, prisma);
      res.status(200).json({
        min: min
      });
      break;
    case "all":
      const min_E = await getExtremumYear(false, prisma);
      const max_E = await getExtremumYear(true, prisma);
      res.status(200).json({
        min: min_E,
        max: max_E
      });
      break;
    default:
      res.send("Not a good option");
      break;
  }
  await prisma.$disconnect();
});

app.post("/mosquitoes", async (req: any, res: any) => {
  const { beginWeek, endWeek } = req.body;
  res.send(await getMosquitoesTrapGeoJson(beginWeek, endWeek));
})

app.get("/traps", async (_req: any, res: any) => {
  res.send(await getUniqueTrapsWithCoordinates());
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
