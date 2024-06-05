import { Dayjs } from "dayjs";
import React from "react";
import "leaflet.heat";
import "dayjs/plugin/weekOfYear";
import { LayerData } from "../../react-app-env";
import { GeoJSON } from "react-leaflet";
import L, { LatLng } from "leaflet";
import { Feature } from "geojson";
import * as geojson from "geojson";
import Legend from "./Legend";
import { getCircleColor, getLegend } from "../../utils";

const pointToLayer = (minValue: number, maxValue: number) => (feature: Feature<geojson.GeometryObject, any>, latlng: LatLng) => {
  const color = getCircleColor(feature?.properties["quantity"], minValue, maxValue);

  const circle = L.circleMarker([latlng.lng, latlng.lat], {
    radius: 10,
    fillColor: color,
    color: "white",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.5
  });

  circle.on("click", () => {
    const infoDiv = document.getElementById("mosquitoInfo");
    const popupContent = `Trap n°${feature?.properties["trap_id"]} Collect: ${feature?.properties["quantity"]}`;

    if (infoDiv) infoDiv.innerHTML = popupContent;

    const popup = circle.bindPopup(popupContent).openPopup();

    popup.bringToFront();
    circle.bringToFront();

  });

  circle.on("mouseover", () => {
    const infoDiv = document.getElementById("mosquitoInfo");
    const popupContent = `<div class="colorValue" style="background: ${color}"></div> Trap n°${feature?.properties["trap_id"]} Collect: ${feature?.properties["quantity"]}`;
    if (infoDiv)
      infoDiv.innerHTML = popupContent;
    circle.bringToFront();
    circle.setStyle({
      color: "black",
      weight: 2
    });
  });
  circle.on("mouseout", () => {
    circle.setStyle({
      color: "white",
      weight: 1
    });
    const infoDiv = document.getElementById("mosquitoInfo");
    const popupContent = `Hover over a trap to see its data`;
    if (infoDiv)
      infoDiv.innerHTML = popupContent;
  });
  return circle;
};

type MosquitoesTrapsProps = {
  beginDate: Dayjs,
  endDate: Dayjs,
  data: LayerData
}

function MosquitoesTraps(props: MosquitoesTrapsProps) {
  const minValue = 1;
  const maxValue = props.data.geojson.properties["maxQuantity"];

  if (props.data.geojson) {
    return (
      <div>
        <GeoJSON key={props.data.geojson.properties.id} data={props.data.geojson}
                 pointToLayer={pointToLayer(minValue, maxValue)} />
        <Legend legend={getLegend(minValue, maxValue)} />
      </div>
    );
  } else {
    return null;
  }

}

export default MosquitoesTraps;