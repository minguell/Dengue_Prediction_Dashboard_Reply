import React, { useEffect, useState } from "react";
import "./styles.css";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

type DateRangeProps = {
  beginDate: Dayjs,
  endDate: Dayjs,
  updateDates: (isBegin: boolean) => (newDate: Dayjs) => void
}


function DateRange(props: DateRangeProps) {
  const [maxDate, setMaxDate] = useState(-1);
  const [minDate, setMinDate] = useState(-1);

  const fetchExtremums = async () => {
    try {
      const response = await fetch("http://localhost:3000/dates/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();
      setMaxDate(dayjs().year()) //setMaxDate(data.max);
      setMinDate(data.min);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchExtremums().then();
  }, []);

  return (
    <div className={"dateContainer"}>
      <DatePicker label="From" value={props.beginDate} defaultValue={props.beginDate} displayWeekNumber={true}
                  onChange={(value) => {
                    if (value) {
                      props.updateDates(true)(value);
                    }
                  }} maxDate={props.endDate} minDate={dayjs(minDate + "-01-01")}
                  format="DD/MM/YYYY"
      />
      <DatePicker label="To" value={props.endDate} defaultValue={props.endDate} displayWeekNumber={true}
                  onChange={(value) => {
                    if (value) {
                      props.updateDates(false)(value);
                    }
                  }} minDate={props.beginDate} maxDate={dayjs(maxDate + "-12-31")} />
    </div>
  );
}

export default DateRange;