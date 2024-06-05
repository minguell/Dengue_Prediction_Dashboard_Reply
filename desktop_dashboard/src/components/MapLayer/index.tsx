import React from "react";
import { Checkbox } from "@mui/material";
import "./styles.css";
import { OptionData } from "../../react-app-env";

type MapLayerProps = {
  infos: OptionData
  name: string
}

function MapLayer(props: MapLayerProps) {
  return (
    <div className={"mapLayer"}>
      <Checkbox checked={props.infos.value} onChange={() => {
        props.infos.set(!props.infos.value);
        let oldLegend = document.getElementById("infoLegend");
        if (oldLegend)
          oldLegend.remove();
        let oldInfo = document.getElementById("dataInfo");
        if (oldInfo)
          oldInfo.remove();
      }} sx={{
        color: "#757575",
        "&.Mui-checked": {
          color: "#DB4437"
        },
        "& .MuiSvgIcon-root": { fontSize: 50 }
      }} />
      <div className={"text"}>{props.name}</div>
    </div>
  );
}

export default MapLayer;
