import React from "react";
import {StyleSheet, View} from "react-native";
import MapView, {Geojson, PROVIDER_GOOGLE} from 'react-native-maps';
import {DistrictMapInfo, MonthDate} from "../../types";
import districts from '../../assets/poa_districts.json'
import {districtBorders} from "../../data/map_data";
import {Legend} from "./Legend";

type Region = {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number
}



const initialRegion: Region = {
    latitude: -30.199906,
    longitude: -51.176433,
    latitudeDelta: 0.5,
    longitudeDelta: 0.3,
}
const mapStyle = [
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
]

type MapProps = {
    beginDate: MonthDate,
    endDate: MonthDate,
    orderedDistricts: DistrictMapInfo[],
}

export const Map = (props: MapProps) => {
    return (
        <View style={styles.map}>
            <MapView style={styles.map}
                     initialRegion={initialRegion}
                     region={initialRegion}
                     maxZoomLevel={15}
                     minZoomLevel={10}
                     customMapStyle={mapStyle}
                     provider={PROVIDER_GOOGLE}>
                {districts.features.map((name, index) => {
                    const insertedObject = {
                        features: [name]
                    };
                    let districtInfos: DistrictMapInfo = {
                        name: "UNDEFINED",
                        diseases: -1,
                        borderColor: 'black',
                    }
                    props.orderedDistricts.forEach((info) => {
                        if (info.name === name.properties.Name){
                            districtInfos = info
                        }
                    })
                    return <Geojson
                        key={index}
                        // @ts-ignore geo-json not handled by IDEs
                        geojson={insertedObject}
                        fillColor={districtInfos.diseaseColor}
                        strokeColor={districtBorders[name.properties.Name]}
                        strokeWidth={2}
                    />
                })}
            </MapView>
            <Legend minValue={props.orderedDistricts[props.orderedDistricts.length - 1].diseases} maxValue={props.orderedDistricts[0].diseases}/>
        </View>
    )
}

const styles = StyleSheet.create({
    map: {
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    text: {
        position: 'absolute',
        fontSize: 20,
        top: '20%',
        right: '50%'
    }
})