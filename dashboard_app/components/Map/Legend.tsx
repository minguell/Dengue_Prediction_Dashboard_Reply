import React from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";

type LegendProps = {
  minValue: number,
  maxValue: number
}

const colors = ["#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#bd0026", "#800026"];
export const Legend = (props: LegendProps) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={colors}
        renderItem={({ item, index }) => (
          <View style={styles.legendValue}>
            <View style={[styles.colorCube, { backgroundColor: item }]} />
            <Text
              style={styles.value}>{Math.floor(props.minValue + index * ((props.maxValue - props.minValue) / 7))}
              {(Math.floor(props.minValue + (index + 1) * ((props.maxValue - props.minValue) / 7)) <= props.maxValue) ? " - " + Math.floor(props.minValue + (index + 1) * ((props.maxValue - props.minValue) / 7)) : "+"}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 0,
    top: 0,

    margin: 10,
    marginTop: 40,
    padding: 5,

    width: 110,
    height: 170,

    borderRadius: 20,

    backgroundColor: "rgba(255,255,255,0.5)"
  },
  legendValue: {
    flexDirection: "row",
    alignItems: "center"
  },
  colorCube: {
    height: 10,
    width: 10,
    marginLeft: 5
  },
  value: {
    marginLeft: 5
  }
});

