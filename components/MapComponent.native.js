// A mobile app to display interactive trail guide content.
// Copyright (C) 2021-2022  David Lougheed
// See NOTICE for more information.

import React, {useRef} from "react";
import {Text, View} from "react-native";
import RNMapView, {Callout, Geojson, Marker} from "react-native-maps";
import Svg, {Circle, Defs, LinearGradient, Stop, Path} from "react-native-svg";

import {transformCoords} from "../gis";

import layerData from "../data/layers.json";
import stationData from "../data/stations.json";

import iconSvgPaths from "./lib/iconSvgPaths";

const stationCoordinates = stationData.flatMap(({data}) =>
    data.map(({coordinates_utm}) => transformCoords(coordinates_utm)));

const colourMap = {
    "red": ["rgb(255, 59, 48)", "rgb(255, 45, 85)"],
    "blue": ["rgb(0, 122, 255)", "rgb(88, 86, 214)"],
    "green": ["rgb(52, 199, 89)", "rgb(0, 199, 190)"],
    "orange": ["rgb(255, 204, 0)", "rgb(255, 149, 0)"],
    "other": ["#333", "#111"],
};

const MapComponent = ({navigation, ...props}) => {
    const mapRef = useRef();

    return <RNMapView
        {...props}
        showsUserLocation={true}
        onMapReady={() => {
            if (mapRef.current) {
                // noinspection JSUnresolvedFunction
                mapRef.current.fitToCoordinates(stationCoordinates, {
                    edgePadding: {
                        top: 50, left: 50, right: 50, bottom: 50,
                    },
                });
            }
        }}
        ref={mapRef}
    >
        {stationData.flatMap(({id, data}, i) =>
            data.map(({id: stationId, title, category, coordinates_utm}, j) =>
                <Marker
                    key={`${i}.${j}`}
                    coordinate={transformCoords(coordinates_utm)}
                    calloutAnchor={{x: 0, y: -0.5}}
                >
                    <View style={{
                        height: 36,
                        width: 36,
                    }}>
                        <Svg height="100%" width="100%" viewBox="0 0 100 100">
                            <Defs>
                                <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                                    <Stop offset="0" stopColor={colourMap[id][0]} stopOpacity="1" />
                                    <Stop offset="1" stopColor={colourMap[id][1] ?? colourMap[id][0]}
                                          stopOpacity="1" />
                                </LinearGradient>
                            </Defs>
                            <Circle cx="50" cy="50" r="50" fill="url(#grad)" />
                            <Svg height="90" width="90" viewBox="-4 -3 29 28">
                                <Path fill="white" d={iconSvgPaths[category]} />
                            </Svg>
                        </Svg>
                    </View>
                    <Callout style={{width: 16 + title.length*6.5}} onPress={() => {
                        navigation.push(`screen.map.station.${stationId}`);
                    }}>
                        <Text style={{textAlign: "center"}}>{title}</Text>
                    </Callout>
                </Marker>
            )
        )}
        {layerData.filter(({enabled}) => enabled).map(({id, geojson}) =>
            <Geojson
                key={id}
                geojson={geojson}
                strokeWidth={3}
            />
        )}
    </RNMapView>;
};

export default MapComponent;
