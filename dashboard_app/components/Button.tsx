import React, {ReactNode} from "react";
import {StyleSheet, TouchableOpacity} from "react-native";

export type ButtonProps = {
    isSelected: boolean,
    style: object,
    selectionStyle: object,
    onPress: () => void,
    children: ReactNode
}
export const Button = (props: ButtonProps) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                props.style,
                props.isSelected && props.selectionStyle,
            ]}
            activeOpacity={1}
            onPress={() => props.onPress()}
        >
            {props.children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
    },
})