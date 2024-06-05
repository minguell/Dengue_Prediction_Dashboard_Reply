import "./styles.css";
import React from "react";
import LoopIcon from "@mui/icons-material/Loop";

function Loading() {
  return (
    <div className={"loading"}>
      <LoopIcon fontSize={"large"} style={{ animation: "rotate 2s linear infinite" }} />
    </div>
  );
}

export default Loading;