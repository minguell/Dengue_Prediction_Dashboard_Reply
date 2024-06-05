import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {District} from "./District";
import {DistrictMapInfo, Districts} from "../../types";

type TopChartProps = {
    orderedDistricts: DistrictMapInfo[],
    selectedDistrict: Districts,
    updateDistrict: (newDistrict: Districts) => () => void,
}

export const TopChart = (props: TopChartProps) => {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text>District name</Text>
                <Text>Number of dengue cases</Text>
            </View>
            <View style={styles.body}>
                {props.orderedDistricts.map((info, index) => {
                    return <District key={index} diseases={info.diseases} name={info.name} isSelected={props.selectedDistrict === info.name}
                                     maxValue={props.orderedDistricts[0].diseases} updateSelection={props.updateDistrict(info.name)}/>
                })}
            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        width: "90%",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "baseline",

        width: "100%",

        padding: 5,

        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderWidth: 2,
        borderColor: "#777777",

        backgroundColor: "f6f6f6",
    },
    body: {
        width: "100%",

        padding: 5,

        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderWidth: 2,
        borderColor: "#777777",
    }
})