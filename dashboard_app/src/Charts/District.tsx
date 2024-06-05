import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {Districts} from "../../types";
import {Button} from "../../components/Button";
import {MaterialIcons} from '@expo/vector-icons';
import {districtBorders} from "../../data/map_data";

type DistrictProps = {
    diseases: number,
    maxValue: number,
    name: Districts,
    isSelected: boolean
    updateSelection: () => void
}

export const District = (props: DistrictProps) => {

    return (
        <View style={styles.container}>
            <Button isSelected={props.isSelected} style={{}} selectionStyle={styles.selectedDistrict}
                    onPress={props.updateSelection}>
                {(props.isSelected) ?
                <MaterialIcons name="radio-button-on" size={24} color={districtBorders[props.name]}/>
                : <MaterialIcons name="radio-button-off" size={24} color="#d1d1d1"/>}
            </Button>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{props.name}</Text>
            </View>
            <View style={[styles.colorBarContainer]}>
                <View style={[styles.colorBar, {
                    width: ((0.1 + props.diseases) * 100) / (props.maxValue + 0.1) + "%",
                    backgroundColor: districtBorders[props.name],
                }]}/>
            </View>
            <Text>{props.diseases}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 10,
        paddingRight: 10,
        height: 25,
    },
    selectedDistrict: {
    },

    text: {
        fontSize: 10,
        textAlign: "center",
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        flex: 1,
    },
    colorBarContainer: {
        flex: 2,
        justifyContent: "center",

        marginLeft: 5,
        marginRight: 10,
    },
    colorBar: {
        borderRadius: 15,
        backgroundColor: "#4a3dd9",
        height: 10,
    }
})