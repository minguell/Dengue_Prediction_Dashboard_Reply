import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {MonthDate, Month, YearValues} from "../../types";
import {Button} from "../../components/Button";
import {Ionicons} from '@expo/vector-icons';
type DateSelectionProps = {
    date: MonthDate,
    updateYear: (addValue: YearValues) => () => void,
    updateMonth: (month: Month) => () => void,
}

export const DateSelection = (props: DateSelectionProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Button isSelected={false} style={styles.button} selectionStyle={{}} onPress={props.updateYear(-1)}>
                    <Ionicons name="chevron-back" size={24} color="#777777"/>
                </Button>
                <Text style={styles.text}>{props.date.year}</Text>
                <Button isSelected={false} style={styles.button} selectionStyle={{}} onPress={props.updateYear(1)}>
                    <Ionicons name="chevron-forward" size={24} color="#777777"/>
                </Button>
            </View>
            <View style={styles.body}>
                <Button isSelected={props.date.month === 1} style={styles.month} selectionStyle={styles.selectedMonth} onPress={props.updateMonth(1)}>
                    <Text>Jan</Text>
                </Button>

                <Button isSelected={props.date.month === 2} style={styles.month} selectionStyle={styles.selectedMonth} onPress={props.updateMonth(2)}>
                    <Text>Feb</Text>
                </Button>

                <Button isSelected={props.date.month === 3} style={styles.month} selectionStyle={styles.selectedMonth} onPress={props.updateMonth(3)}>
                    <Text>Mar</Text>
                </Button>

                <Button isSelected={props.date.month === 4} style={styles.month} selectionStyle={styles.selectedMonth} onPress={props.updateMonth(4)}>
                    <Text>Apr</Text>
                </Button>

                <Button isSelected={props.date.month === 5} style={styles.month} selectionStyle={styles.selectedMonth} onPress={props.updateMonth(5)}>
                    <Text>May</Text>
                </Button>

                <Button isSelected={props.date.month === 6} style={styles.month} selectionStyle={styles.selectedMonth} onPress={props.updateMonth(6)}>
                    <Text>Jun</Text>
                </Button>

                <Button isSelected={props.date.month === 7} style={styles.month} selectionStyle={styles.selectedMonth} onPress={props.updateMonth(7)}>
                    <Text>Jul</Text>
                </Button>

                <Button isSelected={props.date.month === 8} style={styles.month} selectionStyle={styles.selectedMonth} onPress={props.updateMonth(8)}>
                    <Text>Aug</Text>
                </Button>

                <Button isSelected={props.date.month === 9} style={styles.month} selectionStyle={styles.selectedMonth} onPress={props.updateMonth(9)}>
                    <Text>Sep</Text>
                </Button>

                <Button isSelected={props.date.month === 10} style={styles.month} selectionStyle={styles.selectedMonth} onPress={props.updateMonth(10)}>
                    <Text>Oct</Text>
                </Button>

                <Button isSelected={props.date.month === 11} style={styles.month} selectionStyle={styles.selectedMonth} onPress={props.updateMonth(11)}>
                    <Text>Nov</Text>
                </Button>

                <Button isSelected={props.date.month === 12} style={styles.month} selectionStyle={styles.selectedMonth} onPress={props.updateMonth(12)}>
                    <Text>Dec</Text>
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 160,
        height: 250,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        padding: 7,

        borderColor: '#777777',
        borderWidth: 2,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    body: {
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 5,
        justifyContent: 'space-around',
        height: 200,
        alignContent: "space-around",

        borderColor: '#777777',
        borderWidth: 2,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    button: {
        borderColor: '#777777',
        borderWidth: 2,
        borderRadius: 10,
    },
    text: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 19,
    },
    month: {
        borderRadius: 10,
        padding: 5,
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center"
    },
    selectedMonth: {
        backgroundColor: 'rgba(74,61,217,0.3)',
        borderRadius: 10,
        padding: 5
    },
    monthText: {
        textAlign: "center",
        fontSize: 15,
    },
})

