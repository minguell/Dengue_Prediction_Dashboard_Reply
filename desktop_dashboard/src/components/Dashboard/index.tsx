import React from "react";
import "./styles.css";
import MapLayer from "../MapLayer";
import { Divider, List, ListItem } from "@mui/material";
import DateRange from "../DateRange";
import { Dayjs } from "dayjs";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { AllLayers, AllOptions } from "../../react-app-env";
import DengueInfo from "./DengueInfo";
import LayerStyle from "./LayerStyle";

type DashboardProps = {
  beginDate: Dayjs,
  endDate: Dayjs,
  updateDates: (isBegin: boolean) => (newDate: Dayjs) => void,

  allOptions: AllOptions,
  allLayers: AllLayers

  className?: string
}

function Dashboard(props: DashboardProps) {
  return (
    <div className={props.className}>
      <div className={"dashboard-container"}>

        <div className={"header"}>
          <h1>Porto Alegre</h1>
        </div>

        <div className={"body"}>
          <div className={"hintBox"}><InfoOutlinedIcon/> Select a date range and check a box to display the data</div>

          <DateRange beginDate={props.beginDate} endDate={props.endDate} updateDates={props.updateDates}/>

          <List sx={{ width: '100%' }}>

            <ListItem alignItems={"flex-start"} className={"listItem"}>
              <MapLayer infos={props.allOptions.dengue}
                        name={"Dengue diseases"} />
              <DengueInfo isVisible={props.allOptions.dengue.value} data={props.allLayers.dengue} isPrediction={false} isDiff={false}/>
            </ListItem>

            <Divider variant="inset" component="li" />

            <ListItem alignItems={"flex-start"} className={"listItem"}>
              <MapLayer infos={props.allOptions.mosquito}
                        name={"Mosquitoes"} />
              {props.allOptions.mosquito.value && !props.allOptions.isHeatmap.value && <div className={"hintBox"} id={"mosquitoInfo"}><InfoOutlinedIcon/> Hover over a trap to see its data</div>}
            </ListItem>

            <Divider variant="inset" component="li" />

            <ListItem alignItems={"flex-start"} className={"listItem"}>
              <MapLayer infos={props.allOptions.denguePred}
                        name={"Dengue diseases prediction"} />
              <DengueInfo isVisible={props.allOptions.denguePred.value} data={props.allLayers.dengue} isPrediction={true} isDiff={false}/>
            </ListItem>

            <Divider variant="inset" component="li" />

            <ListItem alignItems={"flex-start"} className={"listItem"}>
              <MapLayer infos={props.allOptions.dengueDiff}
                        name={"Dengue diseases difference"} />
              <DengueInfo isVisible={props.allOptions.dengueDiff.value} data={props.allLayers.dengue} isPrediction={false} isDiff={true}/>
            </ListItem>
          </List>

          <LayerStyle isHeatmap={props.allOptions.isHeatmap.value} changeStyle={() => {props.allOptions.isHeatmap.set(!props.allOptions.isHeatmap.value)}}/>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;