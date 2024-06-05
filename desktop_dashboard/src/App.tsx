import React, { useEffect, useState } from "react";
import "./styles.css";
import "leaflet/dist/leaflet.css";
import Dashboard from "./components/Dashboard";
import dayjs, { Dayjs } from "dayjs";
import { AllLayers, AllOptions, GeoData } from "./react-app-env";
import data from "./components/Data";
import Map from "./components/Map";


function App() {

  const [beginDate, setBeginDate] = useState(dayjs("2017-01-01"));
  const [endDate, setEndDate] = useState(dayjs("2019-01-01"));

  function updateDates(isBegin: boolean) {
    return (newDate: Dayjs) => {
      return (isBegin) ? setBeginDate(newDate) : setEndDate(newDate);
    };
  }

  const [showDengue, setDengue] = useState(false);
  const [showDenguePred, setDenguePred] = useState(false);
  const [showMosquito, setMosquito] = useState(false);
  const [showDengueDiff, setDengueDiff] = useState(false);
  const [isHeatmap, setIsHeatmap] = useState(false);
  const allOptions: AllOptions = {
    dengue: {
      value: showDengue,
      set: setDengue
    },
    denguePred: {
      value: showDenguePred,
      set: setDenguePred
    },
    mosquito: {
      value: showMosquito,
      set: setMosquito
    },
    isHeatmap: {
      value: isHeatmap,
      set: setIsHeatmap
    },
    dengueDiff: {
      value: showDengueDiff,
      set: setDengueDiff
    }
  };

  const initGeoData: GeoData = {
    geojson: {
      type: "FeatureCollection",
      features: [],
      properties: {}
    },
    heatLayer: []
  };
  const [dengueData, setDengueData] = useState(initGeoData);
  const [denguePredData, setDenguePredData] = useState(initGeoData);
  const [dengueDiffData, setDengueDiffData] = useState(initGeoData);
  const [mosquitoData, setMosquitoData] = useState(initGeoData);
  const allLayers: AllLayers = {
    dengue: {
      ...dengueData,
      set: setDengueData
    },
    mosquito: {
      ...mosquitoData,
      set: setMosquitoData
    },
    denguePred: {
      ...denguePredData,
      set: setDenguePredData
    },
    dengueDiff: {
      ...dengueDiffData,
      set: setDengueDiffData
    }
  };

  useEffect(() => {
    data({ beginDate: beginDate, endDate: endDate, allLayers: allLayers });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beginDate, endDate]);

  return (
    <div className="container">
      <Dashboard
        beginDate={beginDate} endDate={endDate} updateDates={updateDates}
        allOptions={allOptions}
        allLayers={allLayers}
        className={"drawer"} />

      <Map beginDate={beginDate} endDate={endDate} allOptions={allOptions} allLayers={allLayers} className={"map"} />
    </div>
  );
}

export default App;
