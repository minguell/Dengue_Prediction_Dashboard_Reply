import React, {useEffect, useState} from "react";
import {StyleSheet, View} from 'react-native';
import {DistrictMapInfo, Districts, MapTypes, Month, MonthDate, Options, YearValues} from "./types";
import {Map} from "./components/Map";
import {Navigation} from "./src/Navigation";
import {Calendar} from "./src/Calendar";
import {
    getMaxYear,
    getMinYear,
    isGoodBeginMonth,
    isGoodBeginYear,
    isGoodEndMonth,
    isGoodEndYear
} from "./data/manage_data";
import {Charts} from "./src/Charts";
import {getSortedDistricts} from "./data/map_data";
import {Layers} from "./src/Layers";

const maxYear = getMaxYear();
const minYear = getMinYear();

export default function App() {
    const [selectedButton, setSelectedButton] = useState<Options>("map");
    const [beginDate, setBeginDate] = useState<MonthDate>({year: 2022, month: 1});
    const [endDate, setEndDate] = useState<MonthDate>({year: 2022, month: 1});
    const [orderedDistricts, setNewDistrictOrder] = useState<DistrictMapInfo[]>(getSortedDistricts(beginDate, endDate))
    const [selectedDistrict, setDistrict] = useState<Districts>("CENTRO")
    const [mapType, setMapType] = useState<MapTypes>('districts')

    function updateYear(isBegin: boolean) {
        return (addValue: YearValues) => () => {
            if (isBegin) {
                setBeginDate({
                    year: (isGoodBeginYear(beginDate.year + addValue, endDate.year, minYear)) ? beginDate.year + addValue : beginDate.year,
                    month: 1
                })
                setEndDate({
                    year: endDate.year,
                    month: 1
                })
            } else {
                setEndDate({
                    year: (isGoodEndYear(endDate.year + addValue, beginDate.year, maxYear)) ? endDate.year + addValue : endDate.year,
                    month: endDate.month
                })
                setBeginDate({
                    year: beginDate.year,
                    month: 1
                })
                updateDiseases()
            }
        }
    }

    function updateMonth(isBegin: boolean) {
        return (month: Month) => () => {
            if (isBegin) {
                setBeginDate({
                    year: beginDate.year,
                    month: (isGoodBeginMonth(month, beginDate.year === endDate.year, endDate.month)) ? month : beginDate.month
                })
            } else {
                setEndDate({
                    year: endDate.year,
                    month: (isGoodEndMonth(month, beginDate.year === endDate.year, beginDate.month)) ? month : endDate.month
                })
            }
        }
    }

    function updateDiseases() {
        setNewDistrictOrder(getSortedDistricts(beginDate, endDate))
    }

    function updateSelectedDistrict(newSelection: Districts) {
        return () => {
            setDistrict(newSelection)
        }
    }

    useEffect(() => {
        updateDiseases()
    }, [beginDate, endDate])

    return (
        <View style={styles.container}>
            <Map beginDate={beginDate} endDate={endDate} orderedDistricts={orderedDistricts}/>
            <Calendar isSelected={selectedButton === 'calendar'} beginDate={beginDate} endDate={endDate}
                      updateMonth={updateMonth} updateYear={updateYear}/>
            <Charts isSelected={selectedButton === 'pie-chart'} orderedDistricts={orderedDistricts}
                    selectedDistrict={selectedDistrict} updateDistrict={updateSelectedDistrict} beginDate={beginDate}
                    endDate={endDate}/>
            <Layers isSelected={selectedButton === 'layers'} mapType={mapType} setMapType={(mapType: MapTypes) => { setMapType(mapType)}}/>

            <Navigation isSelected={selectedButton} onShow={(buttonId: Options) => {
                return () => {
                    setSelectedButton(buttonId)
                }
            }}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
