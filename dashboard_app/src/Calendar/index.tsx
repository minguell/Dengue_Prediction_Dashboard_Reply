import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Drawer} from "../../components/Drawer";
import {MonthDate, Month, YearValues} from "../../types";
import {DateSelection} from "./DateSelection";

type CalendarProps = {
    isSelected: boolean,
    beginDate: MonthDate,
    endDate: MonthDate,
    updateYear: (isBegin: boolean) => (addValue: YearValues) => () => void,
    updateMonth: (isBegin: boolean) => (month: Month) => () => void
}

export const Calendar = (props: CalendarProps) => {
    return (
        <Drawer initSize={390} maxSize={450} style={{display: (props.isSelected) ? undefined : 'none'}}>

            <View style={styles.container}>
                <View style={styles.calendar}>
                    <Text style={styles.text}>From:</Text>
                    <DateSelection date={props.beginDate} updateYear={props.updateYear(true)} updateMonth={props.updateMonth(true)}/>
                </View>
                <View style={styles.calendar}>
                    <Text style={styles.text}>To:</Text>
                    <DateSelection date={props.endDate} updateYear={props.updateYear(false)} updateMonth={props.updateMonth(false)}/>
                </View>
            </View>
        </Drawer>
    );
};

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
        margin: 5,
        fontSize: 18,
    },
    container: {
        flexDirection: "row",
        alignItems: 'flex-start',
        justifyContent: "space-around",
        height: '100%',
        width: '100%',
        padding: 5,
    },
    calendar: {},
})

