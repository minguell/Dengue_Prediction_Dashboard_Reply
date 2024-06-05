import React from "react";
import { IconButton } from "@mui/material";
import districtStyle from "./districtStyle.png";
import heatmapStyle from "./heatmapStyle.png";
import "./styles.css"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

type LayerStyleProps = {
  isHeatmap: boolean,
  changeStyle: () => void
}

function LayerStyle(props: LayerStyleProps) {
  const updateImg = () => {
    props.changeStyle();
    let oldInfo = document.getElementById("dataInfo");
    if (oldInfo)
      oldInfo.remove();
    let oldLegend = document.getElementById("infoLegend");
    if (oldLegend)
      oldLegend.remove();
  };

  return (
    <div className={"layerStyleContainer"}>
      <IconButton onClick={updateImg} className={"layerButton"} size={"small"}>
        <img alt={""} src={props.isHeatmap ? districtStyle : heatmapStyle } className={"layerImg"} />
      </IconButton>

      <div className={"hintBox"}><InfoOutlinedIcon/> Click on the picture to change the data display style </div>
    </div>
  );
}

export default LayerStyle;