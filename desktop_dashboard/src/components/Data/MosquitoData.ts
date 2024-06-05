import { Dayjs } from "dayjs";
import L from "leaflet";
import { Feature, Point } from "geojson";
import { LayerData } from "../../react-app-env";

export type MosquitoDataProps = {
  beginDate: Dayjs,
  endDate: Dayjs,

  data: LayerData
}

function MosquitoData(props: MosquitoDataProps) {
  fetch("http://localhost:3000/mosquitoes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      beginWeek: {
        year: props.beginDate.year(),
        week: props.beginDate.week()
      }, endWeek: {
        year: props.endDate.year(),
        week: props.endDate.week()
      }
    })
  }).then(response => response.json()).then(data => {
    let coords: L.HeatLatLngTuple[] = [];
    data.features.forEach((pointFeature: Feature<Point>) => {
      const value = pointFeature.geometry.coordinates;
      const heatLatLngValue: L.HeatLatLngTuple = [value[0], value[1], pointFeature.properties?.quantity / data.properties["maxQuantity"]];
      coords.push(heatLatLngValue);
    });
    props.data.set({
      geojson: data,
      heatLayer: coords
    });
  });
  return null;
}

export default MosquitoData;