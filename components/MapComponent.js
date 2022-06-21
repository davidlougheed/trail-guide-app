// A mobile app to display interactive trail guide content.
// Copyright (C) 2021-2022  David Lougheed
// See NOTICE for more information.

import React from "react";
import {Dimensions, Text, TouchableOpacity, View} from "react-native";
import L from "leaflet";
import {GeoJSON, MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

import {transformCoords} from "../gis";

import layerData from "../data/layers.json";
import stationData from "../data/stations.json";

import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Fix issue with marker PNG; see https://stackoverflow.com/questions/49441600/react-leaflet-marker-files-not-found
// Defaults from https://github.com/Leaflet/Leaflet/blob/main/src/layer/marker/Icon.Default.js
L.Marker.prototype.options.icon = L.icon({
    iconUrl: icon,
    iconRetinaUrl: iconRetina,
    shadowUrl: iconShadow,
    iconSize:    [25, 41],
    iconAnchor:  [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize:  [41, 41],
});

const MapComponent = ({navigation, ...props}) => {
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
                return <Marker position={[t.latitude, t.longitude]} key={station.id}>
                    <Popup>
                        <TouchableOpacity onPress={() => navigation.push(`screen.map.station.${station.id}`)}>
                            <Text>{station.title}</Text>
                        </TouchableOpacity>
                    </Popup>
                </Marker>;
            })}
        </MapContainer>;
    </View>;  // Placeholder for now
};

export default MapComponent;
