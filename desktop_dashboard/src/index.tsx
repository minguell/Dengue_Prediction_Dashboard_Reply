import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const getStringDate = (date: Dayjs) => {
  return (date) ? date.date() + "/" + date.month() + 1 + "/" + date.year() : "";
};

root.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <App />
    </LocalizationProvider>
  </React.StrictMode>
);
