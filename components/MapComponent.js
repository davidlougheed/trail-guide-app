// A mobile app to display interactive trail guide content.
// Copyright (C) 2021-2022  David Lougheed
// See NOTICE for more information.

import React, {useMemo} from "react";
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import L from "leaflet";
import {GeoJSON, MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

import {enabledLayers, enabledStations} from "../dataSources";
import {transformCoords} from "../gis";

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

const styles = StyleSheet.create({
    calloutText: {
        textAlign: "center",
        color: "rgb(5, 127, 255)",
    },
});

const enabledStationsLatLong = enabledStations.map(station => {
    const t = transformCoords(station.coordinates_utm);
    return [t.latitude, t.longitude];
});
const bounds = L.latLngBounds(enabledStationsLatLong).pad(0.3);

const MapComponent = ({navigation, ...props}) => {
    const height = Dimensions.get("window").height;
    const mapContainerStyle = useMemo(() => ({height}), [height]);

    // TODO: Configurable centre and boundaries
    // noinspection JSValidateTypes,JSUnresolvedVariable
    return <View {...props}>
        <MapContainer style={mapContainerStyle} bounds={bounds}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {enabledLayers.map(layer =>
                <GeoJSON
                    key={layer.id}
                    data={layer.geojson}
                    style={feature => ({
                        color: feature.properties.stroke ?? feature.properties.color ?? "#000",
                    })}
                />
            )}
            {enabledStations.map((station, si) =>
                <Marker position={enabledStationsLatLong[si]} key={station.id}>
                    <Popup>
                        <TouchableOpacity onPress={() => navigation.push(`screen.map.station.${station.id}`)}>
                            <Text style={styles.calloutText}>{station.title}</Text>
                        </TouchableOpacity>
                    </Popup>
                </Marker>
            )}
        </MapContainer>;
    </View>;
};

export default MapComponent;
