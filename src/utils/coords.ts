import { Districts} from "../../types/types"
import districtsGeo from "../districts/poa_districts.json";
import { AllGeoJSON, pointOnFeature } from "@turf/turf";
export function getRandomCoordinates(districtName: Districts){
  for ( const districtFeature of districtsGeo.features){
    if (districtFeature.properties.name === districtName){
      const randomCoordinate = pointOnFeature(<AllGeoJSON>districtFeature);
      return randomCoordinate.geometry.coordinates;
    }
  }
  return [0, 0]
}