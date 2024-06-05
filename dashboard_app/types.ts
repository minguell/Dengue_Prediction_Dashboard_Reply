export type Options = 'map' | 'calendar' | 'layers' | 'pie-chart'

export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export type MonthDate = {
    month: Month,
    year: number
}

export type YearValues = 1 | -1

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

export type LegendColors =
    '#ffeda0' | '#fed976' | '#feb24c' | '#fd8d3c' | '#fc4e2a' | '#e31a1c' | '#bd0026' | '#800026' |
    '#FFEDA0' | '#FED976' | '#FEB24C' | '#FD8D3C' | '#FC4E2A' | '#E31A1C' | '#BD0026'

export type DistrictMapInfo = {
    name: Districts,
    borderColor: string,
    diseaseColor?: LegendColors,
    diseases: number,
}

export type MapTypes = 'districts' | 'heatmap'