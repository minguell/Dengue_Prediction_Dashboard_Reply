import React from "react";
import { LayerData } from "../../react-app-env";
import PlaceIcon from "@mui/icons-material/Place";

type DengueInfoProps = {
  isVisible: boolean,
  data: LayerData,
  isPrediction: boolean,
  isDiff: boolean
}

function DengueInfo(props: DengueInfoProps) {

  return (
    <div style={{ display: (props.isVisible) ? "" : "none" }}>
      {props.data.geojson && !props.isDiff && props.data.geojson.features.map((district, index) => (
        <div className={"polyItem"} key={index}>
          <PlaceIcon style={{ color: district.properties?.borderColor }} />
          {district.properties?.name}
          <div key={index} style={{ backgroundColor: (props.isPrediction) ? district.properties?.predictionData.color : district.properties?.realData.color }}
               className={"valueContainer"}>{(props.isPrediction) ? district.properties?.predictionData.value : district.properties?.realData.value}</div>
        </div>
      ))}

      {props.data.geojson && props.isDiff && props.data.geojson.features.map((district, index) => (
        <div className={"polyItem"} key={index}>
          <PlaceIcon style={{ color: district.properties?.borderColor }} />
          {district.properties?.name}
          <div key={index} style={{ backgroundColor: district.properties?.diffData.color }}
               className={"valueContainer"}>{district.properties?.diffData.value}</div>
        </div>
      ))}
    </div>
  );
}

export default DengueInfo;