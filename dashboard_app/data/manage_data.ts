import data from '../assets/data.json'
import {DistrictMapInfo, Districts, Month} from "../types";

export const districts: Districts[] = [];

for (const district in data) {
    // @ts-ignore it can only be in data
    districts.push(district);
}

export function getMaxYear() {
    let maxYear = 0
    districts.forEach((district) => {
        // @ts-ignore
        const years = Object.keys(data[district])
        years.forEach((date) => {
            const year = parseInt(date)
            maxYear = (year > maxYear) ? year : maxYear
        })
    })
    return maxYear
}

export function getMinYear() {
    let minYear = Infinity
    districts.forEach((district) => {
        // @ts-ignore
        const years = Object.keys(data[district])
        years.forEach((date) => {
            const year = parseInt(date)
            minYear = (year < minYear) ? year : minYear
        })
    })
    return minYear
}

export function isGoodBeginYear(year: number, endYear: number, minYear: number) {
    return (year >= minYear && year <= endYear)
}

export function isGoodEndYear(year: number, beginYear: number, maxYear: number) {
    return (year <= maxYear && year >= beginYear)
}

export function isGoodBeginMonth(month: Month, isSameYear: boolean, endMonth: Month){
    return (isSameYear && month <= endMonth) || !isSameYear
}

export function isGoodEndMonth(month: Month, isSameYear: boolean, beginMonth: Month){
    return (isSameYear && month >= beginMonth) || !isSameYear
}

export function insertInSortedArray(newDistrict: DistrictMapInfo, sortedDistricts: DistrictMapInfo[]) {
    let low = 0;
    let high = sortedDistricts.length - 1;
    let insertIndex = -1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (sortedDistricts[mid].diseases === newDistrict.diseases) {
            insertIndex = mid;
            break;
        } else if (sortedDistricts[mid].diseases < newDistrict.diseases) {
            high = mid - 1;
        } else {
            low = mid + 1;
            insertIndex = mid + 1; // Position d'insertion si le nombre n'est pas déjà présent
        }
    }

    if (insertIndex === -1) {
        insertIndex = 0; // Insérer au début de la liste si le nombre est plus grand que tous les éléments existants
    }

    sortedDistricts.splice(insertIndex, 0, newDistrict);
    return sortedDistricts;
}
