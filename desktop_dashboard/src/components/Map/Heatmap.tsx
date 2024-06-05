import { useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";
import "dayjs/plugin/weekOfYear";
import { LayerData } from "../../react-app-env";

type HeatmapProps = {
  beginDate: Dayjs,
  endDate: Dayjs,
  data: LayerData,
  isVisible: boolean,
  options?: {radius?: number, maxZoom?: number}
}

function Heatmap(props: HeatmapProps) {
  const map = useMap();
  const [currentLayer, setCurrentLayer] = useState<L.HeatLayer | null>(null);
  useEffect(() => {

    if (currentLayer)
      currentLayer.remove();

    if (props.isVisible) {
      const coords = (props.data.heatLayer) ? props.data.heatLayer : [];
      const layer = L.heatLayer(coords, {
        radius: (props.options?.radius) ? props.options?.radius : 25,
        gradient: {
          "0": "rgb(255,0,255)",
          "0.25": "rgb(0,0,255)",
          "0.5": "rgb(0,255,0)",
          "0.75": "rgb(255,255,0)",
          "1": "rgb(255,0,0)"
        },
        maxZoom: (props.options?.maxZoom) ? props.options?.maxZoom : 20
      }).addTo(map);

      const pane = layer.getPane();
      if (pane)
        pane.style.zIndex = "900";
      setCurrentLayer(layer);
    } else if (currentLayer) {
      currentLayer.remove();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.beginDate, props.endDate, props.isVisible]);
  return null;
}

export default Heatmap;