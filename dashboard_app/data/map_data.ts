import {districts, insertInSortedArray} from "./manage_data";
import data from '../assets/data.json'
import {DistrictMapInfo, Districts, LegendColors, Month, MonthDate} from "../types";

export const districtBorders: { [p: string]: string } = {
    "CENTRO": 'rgba(230,81,0,0.5)', 'CENTRO SUL': 'rgba(1,87,155,0.5)', "CRISTAL": 'rgba(129,119,23,0.5)',
    "CRUZEIRO": 'rgba(0,96,100,0.5)', "EIXO BALTAZAR": 'rgba(255,82,82,0.5)', "EXTREMO SUL": 'rgba(103,58,183,0.5)',
    "GLORIA": 'rgba(175,180,43,0.5)', "HUMAITA NAVEGANTES": 'rgba(2,136,209,0.5)', "ILHAS": 'rgba(194,24,91,0.5)',
    "LESTE": 'rgba(255,214,0,0.5)', "LOMBA DO PINHEIRO": 'rgba(136,14,79,0.5)', "NORDESTE": 'rgba(9,113,56,0.5)',
    "NOROESTE": 'rgba(156,39,176,0.5)', "NORTE": 'rgba(249,168,37,0.5)', "PARTENON": 'rgba(85,139,47,0.5)',
    "RESTINGA": 'rgba(26,35,126,0.5)', "SUL": 'rgba(251,192,45,0.5)'
}

export function getColor(value: number, minValue: number, maxValue: number): LegendColors {
    let step = (maxValue - minValue) / 7
    return value > minValue + 6 * step ? '#800026' :
        value > minValue + 5 * step ? '#BD0026' :
            value > minValue + 4 * step ? '#E31A1C' :
                value > minValue + 3 * step ? '#FC4E2A' :
                    value > minValue + 2 * step ? '#FD8D3C' :
                        value > minValue + step ? '#FEB24C' :
                            value >= minValue ? '#FED976' :
                                '#FFEDA0';
}

function addValue(value: number, district: Districts, year: number, month: Month, isLog: boolean): number{
    if (isLog && district === "CENTRO"){
        // @ts-ignore suppose year in the dataset
        console.log('(', year, ', ', month, '): ', value, ' + ', data[district]['' + year][month])
    }
    // @ts-ignore suppose year in the dataset
    return value + data[district]['' + year][month]
}
function getDistrictInfos(district: Districts, beginDate: MonthDate, endDate: MonthDate, isLog: boolean): DistrictMapInfo {
    let diseases = 0;
    if (beginDate.year === endDate.year) {
        for (let m = beginDate.month; m <= endDate.month; m++) {
            diseases = addValue(diseases, district, beginDate.year, m, isLog)
        }
    } else {
        // Sum all months values for the first year
        for (let m = beginDate.month; m <= 12; m++) {
            diseases = addValue(diseases, district, beginDate.year, m, isLog)
        }

        // full year
        for (let y = beginDate.year + 1; y < endDate.year; y++) {
            for (let m = 1; m <= 12; m++) {
                diseases = addValue(diseases, district, y, <Month>m, isLog)
            }
        }
        // Sum all months values for the last year
        for (let m = 1; m <= endDate.month; m++) {
            diseases = addValue(diseases, district, endDate.year, <Month>m, isLog)
        }
    }

    return {
        name: district,
        borderColor: districtBorders[district],
        diseases: diseases
    }
}

function setColors(districtsInfos: DistrictMapInfo[]){
    let minValue = Infinity;
    let maxValue = 0;
    districtsInfos.forEach((info) =>{
        minValue = (info.diseases < minValue) ? info.diseases : minValue
        maxValue = (info.diseases > maxValue) ? info.diseases : maxValue
    })
    districtsInfos.forEach((info) =>{
        info.diseaseColor = getColor(info.diseases, minValue, maxValue)
    })
    return districtsInfos
}

// Suppose correct dates
export function getSortedDistricts(beginDate: MonthDate, endDate: MonthDate, isLog?: boolean) {
    let sortedDistricts: DistrictMapInfo[] = [];
    districts.forEach((district) => {
        sortedDistricts = insertInSortedArray(getDistrictInfos(district, beginDate, endDate, (isLog) ? isLog: false), sortedDistricts)
    })
    return setColors(sortedDistricts)
}

function getStringDate(date: MonthDate){
    return ((date.month < 10) ? '0' : '') + date.month + '/' + (date.year + '')[2] + (date.year + '')[3]
}

function getNextDate(date: MonthDate): MonthDate{
    if (date.month === 12){
        return {year: date.year + 1, month: 1}
    }else{
        return {year: date.year, month: <Month>(date.month + 1)}
    }
}

export function getGraphData(district: Districts, beginDate: MonthDate, endDate: MonthDate){
    let abscissas: string[] = [];
    let ordinates: number[] = [];
    let currentDate = beginDate;
    while ((currentDate.year <= endDate.year) && ((currentDate.month <= endDate.month) || (currentDate.year < endDate.year))){
        abscissas.push(getStringDate(currentDate))
        // @ts-ignore
        ordinates.push(data[district][currentDate.year][currentDate.month])
        currentDate = getNextDate(currentDate)
    }
    return {
        abscissa: abscissas,
        ordinates: ordinates
    }
}
