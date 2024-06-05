export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export type MonthDate = {
  month: Month,
  year: number
}

export type WeekDate = {
  year: number,
  week: number
}

export type GeoRoutes = "full" | "prediction" | "real";

export type Districts =
  "CENTRO"
  | "CENTRO SUL"
  | "CRISTAL"
  | "CRUZEIRO"
  | "EIXO BALTAZAR"
  | "EXTREMO SUL"
  | "GLORIA"
  | "HUMAITA NAVEGANTES"
  | "ILHAS"
  | "LESTE"
  | "LOMBA DO PINHEIRO"
  | "NORDESTE"
  | "NOROESTE"
  | "NORTE"
  | "PARTENON"
  | "RESTINGA"
  | "SUL"
  | "UNDEFINED"

export const legendColors = [
  '#FFEDA0',
  '#FED976',
  '#FEB24C',
  '#FD8D3C',
  '#FC4E2A',
  '#E31A1C',
  '#BD0026',
  '#800026'
];

export const diffLegendColors = [
  "#00ff00",
  "#66ff00",
  "#bdff00",
  "#ffff00",
  "#ffa300",
  "#ff4c00",
  "#ff0000",
];


export type DistrictData = {
  value: number,
  color: string
}

export type DistrictMapInfo = {
  name: Districts,
  borderColor: string,
  predictionData?: DistrictData,
  realData?: DistrictData,
  diffData?: DistrictData,
}

type LegendValue = {
  color: string,
  name: string
}

export type GeoJsonDistrictInfos = {
  id: number,
  name: string,
  legend: LegendValue[],
  diffLegend?: LegendValue[],
  maxValue: number,
  minValue: number,
  maxDiff: number
}

export type GeoJsonCoordinateInfos = {
  name: string,
  maxQuantity: number
}

export type GeoJsonMosquitoInfos = {
  name: string,
  maxQuantity: number
}

export const districtBorders: { [p: string]: string } = {
  "CENTRO": "rgb(230,81,0)", "CENTRO SUL": "rgb(1,87,155)", "CRISTAL": "rgb(129,119,23)",
  "CRUZEIRO": "rgb(0,96,100)", "EIXO BALTAZAR": "rgb(255,82,82)", "EXTREMO SUL": "rgb(103,58,183)",
  "GLORIA": "rgb(175,180,43)", "HUMAITA NAVEGANTES": "rgb(2,136,209)", "ILHAS": "rgb(194,24,91)",
  "LESTE": "rgb(255,214,0)", "LOMBA DO PINHEIRO": "rgb(136,14,79)", "NORDESTE": "rgb(9,113,56)",
  "NOROESTE": "rgb(156,39,176)", "NORTE": "rgb(249,168,37)", "PARTENON": "rgb(85,139,47)",
  "RESTINGA": "rgb(26,35,126)", "SUL": "rgb(251,192,45)"
};
