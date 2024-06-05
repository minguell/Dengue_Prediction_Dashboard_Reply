import React from "react";
import {TopChart} from "./TopChart";
import {DistrictMapInfo, Districts, MonthDate} from "../../types";
import {BottomChart} from "./BottomChart";
import {StyleSheet, View} from "react-native";

type ChartsProps = {
    isSelected: boolean,
    orderedDistricts: DistrictMapInfo[],
    selectedDistrict: Districts,
    updateDistrict: (newDistrict: Districts) => () => void,
    beginDate: MonthDate,
    endDate: MonthDate
}

export const Charts = (props: ChartsProps) => {


    return (
        <View style={[styles.container, {display: (props.isSelected) ? undefined : 'none'}]}>
            <TopChart orderedDistricts={props.orderedDistricts} selectedDistrict={props.selectedDistrict}
                      updateDistrict={props.updateDistrict}/>
            <BottomChart beginDate={props.beginDate} endDate={props.endDate} district={props.selectedDistrict}/>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '86%',
        position: "absolute",
        bottom: '10%',

        backgroundColor: '#ffffff',

        alignItems: "center",
        padding: 8,
        marginTop: 60,

        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    }
})