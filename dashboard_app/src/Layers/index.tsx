import React, {useRef} from "react";
import {Drawer} from "../../components/Drawer";
import {Animated, StyleSheet, Text, View} from "react-native";
import {MapTypes} from "../../types";
import {Button} from "../../components/Button";

type LayersProps = {
    isSelected: boolean,
    mapType: MapTypes,
    setMapType: (mapType: MapTypes) => void
}

export const Layers = (props: LayersProps) => {
    const animatedValue = useRef(new Animated.Value(0)).current;

    const moveAnimatedSelection = (toValue: number) => {
        Animated.spring(animatedValue, {
            toValue,
            useNativeDriver: false,
            speed: 0.5,
            bounciness: 1
        }).start();
    };

    const handleButtonPress = (mapType: MapTypes) => {
        props.setMapType(mapType);
        if (mapType === "districts") {
            moveAnimatedSelection(0);
        } else if (mapType === "heatmap") {
            moveAnimatedSelection(0.5);
        }
    };

    return (
        <Drawer style={{
            display: (props.isSelected) ? undefined : 'none',
        }} initSize={580} maxSize={150}>
            <View style={styles.buttonContainer}>
                <Animated.View
                    style={[
                        styles.animatedSelection,
                        { transform: [{ translateX: animatedValue.interpolate({ inputRange: [0, 0.5], outputRange: [0, 160] }) }] },
                    ]}
                />

                <Button isSelected={props.mapType === 'districts'} style={styles.button} selectionStyle={{}}
                        onPress={() => handleButtonPress("districts")}>
                    <Text
                        style={[{color: (props.mapType === 'districts') ? '#4A3DD9' : '#BDBDBD'}, styles.buttonText]}>Districts</Text>
                </Button>

                <Button isSelected={props.mapType === 'heatmap'} style={styles.button} selectionStyle={{}}
                        onPress={() => handleButtonPress("heatmap")}>
                    <Text style={[{
                        color: (props.mapType === 'heatmap') ? '#4A3DD9' : '#BDBDBD'}, styles.buttonText]}>Heat map</Text>
                </Button>

            </View>
        </Drawer>
    )

}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 320,
        height: 70,
        backgroundColor: '#f6f6f6',
        marginTop: 10,

        flexDirection: "row",
        justifyContent: "space-between",

        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#E8E8E8',

        overflow: "hidden"
    },
    button: {
        backgroundColor: undefined,
        borderRadius: 15,
        width: '50%',

        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        fontSize: 25,
        fontWeight: "400",
    },
    animatedSelection: {
        position: "absolute",
        height: '100%',
        width: '50%',
        backgroundColor: '#ffffff',
        borderRadius: 40,
    }
})