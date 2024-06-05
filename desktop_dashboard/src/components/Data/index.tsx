import MosquitoData from "./MosquitoData";
import { Dayjs } from "dayjs";
import DengueData from "./DengueData";
import { AllLayers } from "../../react-app-env";

export type DataProps = {
  beginDate: Dayjs,
  endDate: Dayjs,

  allLayers: AllLayers
}

function Data(props: DataProps) {
  DengueData({ beginDate: props.beginDate, endDate: props.endDate, allData: props.allLayers }).then();
  MosquitoData({ beginDate: props.beginDate, endDate: props.endDate, data: props.allLayers.mosquito });

  return null;
}

export default Data;