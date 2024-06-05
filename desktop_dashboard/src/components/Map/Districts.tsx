import React, { useEffect } from "react";
import { GeoJSON, useMap } from "react-leaflet";
import { Feature } from "geojson";
import { LayerData } from "../../react-app-env";
import L from "leaflet";
import { Dayjs } from "dayjs";
import { getStringDate } from "../../index";

const zoomToFeature = (map: L.Map) => (e: L.LeafletMouseEvent) => {
  map.fitBounds(e.target.getBounds());
};

const update = (props: { beginDate: Dayjs, endDate: Dayjs }, data?: {
  predictionData: any,
  realData: any,
  name: string
}) => {
  const div = document.getElementById("dataInfo");
  if (div)
    div.innerHTML = "<h4>Dengue diseases from " + getStringDate(props.beginDate) + " to " + getStringDate(props.endDate) + "</h4><b>District: " + (data ?
      data.name + "</b><br/>Real data: " + data.realData.value + " diseases<br/>Predicted data: " + data.predictionData.value + " diseases"
      : "</b><br />Hover over a district");
};

type DistrictsProps = {
  data: LayerData,

  beginDate: Dayjs,
  endDate: Dayjs,

  styleFunction: (feature?: Feature) => {},
  defaultStyle: {
    weight: number,
    fillOpacity: number
  }
};

function Districts(props: DistrictsProps) {
  const map = useMap();

  useEffect(() => {
    const info = L.control.attribution({ position: "topright" });
    info.onAdd = function() {
      let oldInfo = document.getElementById("dataInfo");
      if (oldInfo)
        oldInfo.remove();
      const div = L.DomUtil.create("div", "dataInfo");
      div.id = "dataInfo";
      div.innerHTML = "<h4>Dengue diseases</h4><b>District: </b><br /> Hover over a district";
      return div;
    };

    info.addTo(map);

  }, [map, props.beginDate, props.endDate]);

  if (props.data.geojson) {
    return (
      <GeoJSON key={props.data.geojson.properties.id} data={props.data.geojson} style={props.styleFunction}
               onEachFeature={(_feature: Feature, layer: L.Layer) => {
                 layer.on({
                   mouseout: (e: L.LeafletMouseEvent) => {
                     const layer = e.target;
                     layer.setStyle(props.defaultStyle);

                     update({ beginDate: props.beginDate, endDate: props.endDate }, layer.feature.properties);
                     update({ beginDate: props.beginDate, endDate: props.endDate });
                   },
                   mouseover: (e: L.LeafletMouseEvent) => {
                     const layer = e.target;
                     layer.setStyle({
                       weight: 5,
                       fillOpacity: 0.8
                     });

                     layer.bringToFront();
                     update({ beginDate: props.beginDate, endDate: props.endDate }, layer.feature.properties);
                   },
                   click: zoomToFeature(map)
                 });
               }} />
    );
  } else {
    return null;
  }
}

export default Districts;