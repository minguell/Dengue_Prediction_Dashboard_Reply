/// <reference types="react-scripts" />

import { FeatureCollection } from "geojson";
import L from "leaflet";

type OptionValues = "isHeatmap"| "dengue" | "denguePred" | "mosquito" | "dengueDiff"
type OptionData = {
  value: boolean,
  set: (v: boolean) => void
}

type AllOptions = {
  [key in OptionValues]: OptionData;
}

type GeoJsonType = FeatureCollection & { properties: any }
type HeatType = L.HeatLatLngTuple[]

type GeoData = {
  geojson: GeoJsonType,
  heatLayer: HeatType
}
type LayerData = GeoData & { set: (newGeo: GeoData) => void }
type LayerValue = "dengue" | "mosquito" | "denguePred" | "dengueDiff"

type AllLayers = {
  [key in LayerValue]: LayerData;
}