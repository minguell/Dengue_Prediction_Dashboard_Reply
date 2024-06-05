import React from "react";
import {StyleSheet, View} from "react-native";
import {Button} from "../../components/Button";
import {Options} from "../../types";
import {Entypo} from "@expo/vector-icons";

type ButtonBarProps = {
    isSelected: Options,
    onShow: (buttonId: Options) => () => void
}

export const Navigation = (props: ButtonBarProps) => {

    return (
        <View style={styles.buttonBar}>
            <Button isSelected={props.isSelected === 'map'} style={styles.button} selectionStyle={styles.selectedButton} onPress={props.onShow('map')}>
                <Entypo name={'map'} size={40} color={(props.isSelected === 'map') ? '#4A3DD9' : '#777777'}/>
            </Button>

            <Button isSelected={props.isSelected === 'calendar'} style={styles.button} selectionStyle={styles.selectedButton} onPress={props.onShow('calendar')}>
                <Entypo name={'calendar'} size={40} color={(props.isSelected === 'calendar') ? '#4A3DD9' : '#777777'}/>
            </Button>

            <Button isSelected={props.isSelected === 'pie-chart'} style={styles.button} selectionStyle={styles.selectedButton} onPress={props.onShow('pie-chart')}>
                <Entypo name={'pie-chart'} size={40} color={(props.isSelected === 'pie-chart') ? '#4A3DD9' : '#777777'}/>
            </Button>

            <Button isSelected={props.isSelected === 'layers'} style={styles.button} selectionStyle={styles.selectedButton} onPress={props.onShow('layers')}>
                <Entypo name={'layers'} size={40} color={(props.isSelected === 'layers') ? '#4A3DD9' : '#777777'}/>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonBar: {
        position: "absolute",
        bottom: 0,
        width: '100%',
        height: '10%',

        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#f6f6f6',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: '#f6f6f6',
        borderRadius: 10,
        padding: 5
    },
    selectedButton: {
        backgroundColor: 'rgba(74,61,217,0.5)',
    }
});