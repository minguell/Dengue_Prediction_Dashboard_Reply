import React, {ReactNode, useRef} from 'react';
import {PanResponder, Animated, StyleSheet, View} from 'react-native';

type DrawerProps = {
    style: object,
    initSize: number,
    maxSize: number,
    children?: ReactNode
}

// const screenHeight = Dimensions.get('window').height;

export const Drawer = (props: DrawerProps) => {
    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                 // if dy > -(props.initSize -  props.maxSize)
                Animated.event(
                    [
                        null,
                        {dx: pan.x, dy: pan.y},
                    ],
                    {useNativeDriver: false}
                )(_, gestureState);
            },
            onPanResponderRelease: () => {
                const isAboveHalfScreen = false//gestureState.moveY < screenHeight / 2;
                if (isAboveHalfScreen) {
                    Animated.spring(pan, {
                        toValue: {x: 0, y: -(props.initSize - props.maxSize)},
                        useNativeDriver: false
                    }).start();
                } else {
                    Animated.spring(pan, {
                        toValue: {x: 0, y: 0},
                        useNativeDriver: false
                    }).start();
                }
            },
        })
    ).current;

    const animatedStyle = {
        transform: pan.getTranslateTransform(),
    };

    return (
        <Animated.View
            style={[animatedStyle, styles.drawer, {
                top: props.initSize,
                height: props.maxSize,
                transform: [{translateY: pan.y}],
                backgroundColor: '#ffffff',
            }, props.style]}
            {...panResponder.panHandlers}
        >
            <View style={styles.container}>
                <View style={styles.drawerButton}></View>
                {props.children}
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    drawer: {
        position: 'absolute',
        width: '100%',
        borderRadius: 30,
    },
    drawerButton: {
        backgroundColor: '#e8e8e8',
        width: '15%',
        height: 6,
        borderRadius: 15,
        margin: 10,
    },
    container: {
        alignContent: "center",
        alignItems: "center"
    }
})