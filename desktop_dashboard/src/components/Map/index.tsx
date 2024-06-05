import React, { useEffect, useState } from "react";
import "./styles.css";
import { MapContainer, Pane, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Dayjs } from "dayjs";
import Heatmap from "./Heatmap";
import Districts from "./Districts";
import MosquitoesTraps from "./MosquitoesTraps";
import { AllLayers, AllOptions, GeoJsonType } from "../../react-app-env";
import * as geojson from "geojson";
import Legend from "./Legend";
import Loading from "../Loading";

const defaultStyle = { weight: 0.5, fillOpacity: 0.8 };
const defaultOptions = { radius: 35, maxZoom: 11 };

const styleFunction = (isReal: boolean, isDiff?: boolean) => (feature?: geojson.Feature<geojson.GeometryObject, any>) => {
  return {
    color: feature?.properties.borderColor,
    weight: defaultStyle.weight,
    fillOpacity: defaultStyle.fillOpacity,
    fillColor: (isReal) ? feature?.properties["realData"].color : ((!isDiff) ? feature?.properties["predictionData"].color : feature?.properties["diffData"].color)
  };
};


type MapProps = {
  className?: string,

  beginDate: Dayjs,
  endDate: Dayjs,

  allOptions: AllOptions,
  allLayers: AllLayers
}
function Map(props: MapProps) {
  const [mosquitoData, setMosquitoData] = useState<null | GeoJsonType>(null);
  useEffect(() => {
    setMosquitoData(props.allLayers.mosquito.geojson);
  }, [setMosquitoData, props.allLayers.mosquito.geojson]);
  return (
    <div className={props.className}>
      <MapContainer center={[-30.111405, -51.115734]} zoom={11} className={props.className} zoomControl={false}
                    maxZoom={13}>
        <ZoomControl position="bottomleft" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
        />

        <Pane name={"Districts"} style={{ zIndex: 300 }}>
          {!props.allOptions.isHeatmap.value && !props.allOptions.mosquito.value &&
            <Districts data={props.allLayers.dengue} beginDate={props.beginDate} endDate={props.endDate}
                       styleFunction={(feature?: geojson.Feature<geojson.GeometryObject, any>) => {
                         return {
                           color: feature?.properties.borderColor,
                           weight: 0.5,
                           fillOpacity: 0
                         };
                       }} defaultStyle={{ weight: 0.5, fillOpacity: 0 }} />}

        </Pane>

        <Heatmap beginDate={props.beginDate} endDate={props.endDate} data={props.allLayers.dengue}
                 isVisible={props.allOptions.dengue.value && props.allOptions.isHeatmap.value}
                 options={defaultOptions} />

        <Heatmap beginDate={props.beginDate} endDate={props.endDate} data={props.allLayers.mosquito}
                 isVisible={props.allOptions.mosquito.value && props.allOptions.isHeatmap.value}
                 options={{ maxZoom: 13 }} />

        <Heatmap beginDate={props.beginDate} endDate={props.endDate} data={props.allLayers.denguePred}
                 isVisible={props.allOptions.denguePred.value && props.allOptions.isHeatmap.value}
                 options={defaultOptions} />

        <Heatmap beginDate={props.beginDate} endDate={props.endDate} data={props.allLayers.dengueDiff}
                 isVisible={props.allOptions.dengueDiff.value && props.allOptions.isHeatmap.value}
                 options={defaultOptions} />

        <Pane name={"traps"} style={{ zIndex: 500 }}>
          {props.allOptions.mosquito.value && !props.allOptions.isHeatmap.value && ((mosquitoData?.features && mosquitoData.features.length > 0) ?
            (<MosquitoesTraps beginDate={props.beginDate} endDate={props.endDate}
                              data={props.allLayers.mosquito} />) : (<Loading />))}
        </Pane>

        <Pane name={"districts"} style={{ zIndex: 400 }}>
          {props.allOptions.dengue.value && !props.allOptions.isHeatmap.value &&
            <Districts beginDate={props.beginDate} endDate={props.endDate} data={props.allLayers.dengue}
                       styleFunction={styleFunction(true)} defaultStyle={defaultStyle} />}
          {props.allOptions.denguePred.value && !props.allOptions.isHeatmap.value &&
            <Districts beginDate={props.beginDate} endDate={props.endDate} data={props.allLayers.denguePred}
                       styleFunction={styleFunction(false)} defaultStyle={defaultStyle} />}
          {!props.allOptions.isHeatmap.value && (props.allOptions.dengue.value || props.allOptions.denguePred.value) &&
            <Legend legend={props.allLayers.dengue.geojson.properties.legend} />}

          {!props.allOptions.isHeatmap.value && props.allOptions.dengueDiff.value &&
            <Districts data={props.allLayers.dengueDiff} beginDate={props.beginDate} endDate={props.endDate}
                       styleFunction={styleFunction(false, true)} defaultStyle={defaultStyle} />}
          {!props.allOptions.isHeatmap.value && props.allOptions.dengueDiff.value &&
            <Legend legend={props.allLayers.dengueDiff.geojson.properties["diffLegend"]} />}
        </Pane>

      </MapContainer>

    </div>

  );
}

export default Map;
