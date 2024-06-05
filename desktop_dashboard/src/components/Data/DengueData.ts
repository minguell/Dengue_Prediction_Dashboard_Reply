import { Dayjs } from "dayjs";
import { AllLayers } from "../../react-app-env";
import L from "leaflet";
import { Feature, Point } from "geojson";

export type DengueDataProps = {
  beginDate: Dayjs,
  endDate: Dayjs,

  allData: AllLayers
}

async function DengueData(props: DengueDataProps) {
  const districtResponse = await fetch("http://localhost:3000/district/full", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      beginDate: {
        year: props.beginDate.year(),
        month: props.beginDate.month() + 1
      }, endDate: {
        year: props.endDate.year(),
        month: props.endDate.month() + 1
      }, geometry: true
    })
  });

  const coordinateResponse = await fetch("http://localhost:3000/coordinate/full", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      beginDate: {
        year: props.beginDate.year(),
        month: props.beginDate.month() + 1
      }, endDate: {
        year: props.endDate.year(),
        month: props.endDate.month() + 1
      }
    })
  });

  const coordinateData: { real: any, prediction: any } = await coordinateResponse.json();
  const districtData = await districtResponse.json();

  let realCoords: L.HeatLatLngTuple[] = [];
  coordinateData.real.features.forEach((pointFeature: Feature<Point>) => {
    const value = pointFeature.geometry.coordinates.reverse();
    const heatLatLngValue: L.HeatLatLngTuple = [value[0], value[1], 1/districtData.properties.maxValue];
    realCoords.push(heatLatLngValue);
  });

  let predictionCoords: L.HeatLatLngTuple[] = [];
  coordinateData.prediction.features.forEach((pointFeature: Feature<Point>) => {
    const value = pointFeature.geometry.coordinates.reverse();
    const heatLatLngValue: L.HeatLatLngTuple = [value[0], value[1], pointFeature.properties?.value/districtData.properties.maxValue];
    predictionCoords.push(heatLatLngValue);
  });

  let diffCoords: L.HeatLatLngTuple[] = [];
  coordinateData.prediction.features.forEach((pointFeature: Feature<Point>) => {
    const value = pointFeature.geometry.coordinates.reverse();
    const heatLatLngValue: L.HeatLatLngTuple = [value[1], value[0], pointFeature.properties?.value/districtData.properties["maxDiff"]];
    diffCoords.push(heatLatLngValue);
  });


  props.allData.dengue.set({
    geojson: districtData,
    heatLayer: realCoords
  });
  props.allData.denguePred.set({
    geojson: districtData,
    heatLayer: predictionCoords
  });
  props.allData.dengueDiff.set({
    geojson: districtData,
    heatLayer: diffCoords
  });
  return null;
}

export default DengueData;