import { MonthDate } from "../../types/types";


export function logDate(beginDate: MonthDate, endDate: MonthDate){
  console.log("from " + beginDate.year + "/" + beginDate.month + " to " + endDate.year + "/" + endDate.month);
}