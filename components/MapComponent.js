// A mobile app to display interactive trail guide content.
// Copyright (C) 2021-2025  David Lougheed
// See NOTICE for more information.

import React, {useMemo} from "react";
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import L from "leaflet";
import {GeoJSON, MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

import {localDataProvider} from "../dataSources";
import {transformCoords} from "../gis";

import "leaflet/dist/leaflet.css";
// import icon from "leaflet/dist/images/marker-icon.png";
// import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
// import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Fix issue with marker PNG; see https://stackoverflow.com/questions/49441600/react-leaflet-marker-files-not-found
// Defaults from https://github.com/Leaflet/Leaflet/blob/main/src/layer/marker/Icon.Default.js
// Not ideal to rely on a CDN for this, but local image loading doesn't seem to work in Expo 51+ / with Metro bundler.
// This is only for the web version anyway.
L.Marker.prototype.options.icon = L.icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
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

const enabledStationsLatLong = localDataProvider.stations.enabled.map(station => {
    const t = transformCoords(station.coordinates_utm);
    return [t.latitude, t.longitude];
});
const bounds = L.latLngBounds(enabledStationsLatLong).pad(0.3);

const MapComponent = ({navigation, ...props}) => {
    const height = Dimensions.get("window").height;
    const mapContainerStyle = useMemo(() => ({height}), [height]);

    const {layers, stations} = localDataProvider;

    // TODO: Configurable centre and boundaries
    // noinspection JSValidateTypes,JSUnresolvedVariable
    return <View {...props}>
        <MapContainer style={mapContainerStyle} bounds={bounds}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {layers.enabled.map(layer =>
                <GeoJSON
                    key={layer.id}
                    data={layer.geojson}
                    style={feature => ({
                        color: feature.properties.stroke ?? feature.properties.color ?? "#000",
                    })}
                />
            )}
            {stations.enabled.map((station, si) =>
                <Marker position={enabledStationsLatLong[si]} key={station.id}>
                    <Popup>
                        <TouchableOpacity onPress={() => navigation.push(`screen.map.station.${station.id}`)}>
                            <Text style={styles.calloutText}>{station.title}</Text>
                        </TouchableOpacity>
                    </Popup>
                </Marker>
            )}
        </MapContainer>
    </View>;
};

export default MapComponent;
