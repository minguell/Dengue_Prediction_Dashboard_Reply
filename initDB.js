const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const districts = ["CENTRO", "CENTRO SUL", "CRISTAL", "CRUZEIRO", "EIXO BALTAZAR", "EXTREMO SUL", "GLORIA", "HUMAITA NAVEGANTES",
  "ILHAS", "LESTE", "LOMBA DO PINHEIRO", "NORDESTE", "NOROESTE", "NORTE", "PARTENON", "RESTINGA", "SUL", "UNDEFINED"];

const fs = require("fs");
const csv = require("csv-parser");

async function main() {
  await prisma.district.deleteMany({ where: {} });
  for (const name of districts) {
    await prisma.district.create({ data: { name: name } });
  }

  fs.createReadStream("./prisma/data/dengue/dengue_input_simple.csv")
    .pipe(csv({ separator: ";" }))
    .on("data", async (data) => {
      const districtName = data.nome_distrito;
      const diseases = parseInt(data.dengue_diagnosis);
      const year = parseInt(data.ano);
      const month = parseInt(data.mes);
      for (let i = 0; i < diseases; i++) {
        await prisma.realCase.create({
          data: {
            year: year,
            month: month,
            districtName: districtName
          }
        });
      }
    })
    .on("end", () => {
    });

  fs.createReadStream("./prisma/data/dengue/result_prediction_simple.csv")
    .pipe(csv({ separator: "," }))
    .on("data", async (data) => {
      const districtName = data.nome_distrito;
      const diseases = parseInt(data.dengue_diagnosis_previsto);
      const year = parseInt(data.ano);
      const month = parseInt(data.mes);
      await prisma.predictedCase.create({
        data: {
          year: year,
          month: month,
          value: diseases,
          district: {
            connect: { name: districtName }
          }
        }
      });
    })
    .on("end", () => {
    });


  // Mosquitoes database
  let year = 2017;
  let week = 1;
  const fileExtension = ".json";
  const homePath = "./prisma/data/mosquitoes/";

  function getFilename(year, week) {
    return homePath + year + "_" + week + fileExtension;
  }

  let allWeeks = 0;
  let nbInspection = 0;
  await prisma.inspection.deleteMany({ where: {} });
  await prisma.inspectionMosquito.deleteMany({ where: {} });
  await prisma.inspectionVirus.deleteMany({ where: {} });
  await prisma.mosquito.deleteMany({ where: {} });
  await prisma.virus.deleteMany({ where: {} });
  await prisma.trap.deleteMany({ where: {} });

  while (fs.existsSync(getFilename(year, week))) {
    const data = JSON.parse(fs.readFileSync(getFilename(year, week))).data;
    try {
      allWeeks += 1;
      const len = data.length;
      if (len === 0) {
        //console.log("No data for " + year + "/" + week);
      } else {
        for (let i = 0; i < len; i++) {
          if (data[i].inspection && data[i].inspection.mosquitoes.length > 0) {
            await addInspectionData(year, week, data[i].region_id, data[i].trap_id, data[i].geo.geometry.coordinates[0], data[i].geo.geometry.coordinates[1], data[i].inspection, prisma);
            nbInspection++;
          }
        }
      }
      year = (week === 54) ? year + 1 : year;
      week = (week === 54) ? 1 : week + 1;
    } catch (error) {
      console.log("An error has occurred: " + error + "\nyear: " + year + "\nweek: " + week);
      break;
    }
  }
  console.log("there are " + nbInspection + " inspections in the dataset");

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

async function addInspectionData(year, week, region_id, trap_id, lat, lng, inspectionData, prisma) {
  const existTrap = await prisma.trap.findUnique({
    where: {
      id: trap_id
    }
  });
  if (!existTrap) {
    await prisma.trap.create({
      data: {
        id: trap_id,
        latitude: lat,
        longitude: lng
      }
    });
  }

  await prisma.inspection.create({
    data: {
      id: inspectionData.id,
      year: year,
      week: week,
      region_id: region_id,
      trapId: trap_id
    }
  });

  for (let index in inspectionData.mosquitoes) {
    const mosquito = inspectionData.mosquitoes[index];
    const existingMosquito = await prisma.mosquito.findUnique({
      where: {
        id: mosquito.id
      }
    });
    if (!existingMosquito) {
      await prisma.mosquito.create({
        data: {
          id: mosquito.id,
          name: mosquito.name
        }
      });
    }
    if (mosquito.pivot.quantity > 0){
      await prisma.inspectionMosquito.create({
        data: {
          quantity: mosquito.pivot.quantity,
          gender: mosquito.gender,
          mosquitoId: mosquito.id,
          inspectionId: inspectionData.id
        }
      });
    }
  }

  for (let index in inspectionData.virus) {
    const virus = inspectionData.virus[index];
    const existingVirus = await prisma.virus.findUnique({
      where: {
        id: virus.id
      }
    });
    if (!existingVirus) {
      await prisma.virus.create({
        data: {
          id: virus.id,
          name: virus.name
        }
      });
    }
    await prisma.inspectionVirus.create({
      data: {
        virusId: virus.id,
        inspectionId: inspectionData.id
      }
    });
  }

}