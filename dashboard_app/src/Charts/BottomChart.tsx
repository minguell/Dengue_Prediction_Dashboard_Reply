import React, {useEffect, useState} from "react";
import {LineChart} from 'react-native-chart-kit';
import {ScrollView, StyleSheet, useWindowDimensions, View} from 'react-native';
import {Districts, MonthDate} from "../../types";
import {districtBorders, getGraphData} from "../../data/map_data";

type BottomChartProps = {
    district: Districts,
    beginDate: MonthDate,
    endDate: MonthDate
}

export const BottomChart = (props: BottomChartProps) => {
    const windowWidth = useWindowDimensions().width

    const initData = getGraphData(props.district, props.beginDate, props.endDate)
    const [abscissas, setAbscissas] = useState(initData.abscissa)
    const [ordinates, setOrdinates] = useState(initData.ordinates)
    useEffect(() => {
        const newData = getGraphData(props.district, props.beginDate, props.endDate)
        setAbscissas(newData.abscissa)
        setOrdinates(newData.ordinates)
    }, [props.beginDate, props.endDate, props.district])
    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} style={styles.scroll} showsHorizontalScrollIndicator={false}>
                <LineChart
                    data={{
                        labels: abscissas,
                        datasets: [
                            {
                                data: ordinates,
                                color: () => districtBorders[props.district],
                            }
                        ],
                        legend: ['Dengue cases over time for ' + props.district]
                    }}
                    width={windowWidth + abscissas.length * 20}
                    height={150}
                    chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        decimalPlaces: 0,
                        color: () => '#777777',
                        style: {
                            borderRadius: 16,
                        },
                    }}
                    bezier
                    style={styles.chart}
                    verticalLabelRotation={-20}
                    xLabelsOffset={-2}
                />
            </ScrollView>
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        width: '90%',

        backgroundColor: '#ffffff',

        borderRadius: 15,
        borderWidth: 2,
        borderColor: "#777777",

        marginTop: 10
    },
    scroll: {
        borderRadius: 15,
        marginLeft: 5,
        marginRight: 5,
    },
    chart: {
        right: 40,
        borderRadius: 15,
        padding: 5,
    }
});