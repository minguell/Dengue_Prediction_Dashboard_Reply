import { useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";

export type LegendProps = {
  legend: any[]
}

function Legend(props: LegendProps) {
  const map = useMap();
  const legend = L.control.attribution({ position: "bottomright" });

  useEffect(() => {
    legend.onAdd = function() {
      let oldLegend = document.getElementById("infoLegend");
      if (oldLegend)
        oldLegend.remove();
      const div = L.DomUtil.create("div", "infoLegend");
      div.id = "infoLegend";
      if (props.legend){
        for (let i = 0; i < props.legend.length; i++) {
          div.innerHTML +=
            "<div><i style=\"background: " + props.legend[i].color + "\"></i> " + props.legend[i].name + "</div>";
        }
      }
      return div;
    };

    legend.addTo(map);
  }, [map, legend, props.legend]);
  return null;
}

export default Legend;