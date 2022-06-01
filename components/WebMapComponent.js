import React from "react";
import {Dimensions, Text, TouchableOpacity, View} from "react-native";
import {GeoJSON, MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

import {transformCoords} from "../gis";

import layerData from "../data/layers.json";
import stationData from "../data/stations.json";

import "leaflet/dist/leaflet.css";

const WebMapComponent = ({navigation, ...props}) => {
    const height = Dimensions.get("window").height;

    // noinspection JSValidateTypes,JSUnresolvedVariable
    return <View {...props}>
        <MapContainer center={[44.4727488, -76.4295608]} zoom={14} style={{height}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {layerData.filter(layer => layer.enabled).map(layer =>
                <GeoJSON
                    key={layer.id}
                    data={layer.geojson}
                    style={feature => ({
                        color: feature.properties.stroke ?? feature.properties.color ?? "#000",
                    })}
                />
            )}
            {stationData.flatMap(t => t.data).filter(station => station.enabled).map(station => {
                const t = transformCoords(station.coordinates_utm);
                return <Marker position={[t.latitude, t.longitude]}>
                    <Popup>
                        <TouchableOpacity onPress={() => navigation.push(`screen.map.station.${title}`)}>
                            <Text>{station.title}</Text>
                        </TouchableOpacity>
                    </Popup>
                </Marker>;
            })}
        </MapContainer>;
    </View>;  // Placeholder for now
};

export default WebMapComponent;
