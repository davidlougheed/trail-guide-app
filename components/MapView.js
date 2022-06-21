// A mobile app to display interactive trail guide content.
// Copyright (C) 2021-2022  David Lougheed
// See NOTICE for more information.

import React, {useMemo} from "react";
import {StyleSheet, useWindowDimensions, View} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import StationsDetailView from "./StationsDetailView";

import stationData from "../data/stations.json";

import MapComponent from "./MapComponent";
import {mapStationScreenName} from "../routes";

const Stack = createNativeStackNavigator();

/** @type React.ReactNode[] */
const STATION_SCREENS = stationData
    .flatMap(t => t.data)
    .map(s => <Stack.Screen
        key={s.title}
        name={mapStationScreenName(s.id)}
        options={{title: s.title}}
    >{props => <StationsDetailView {...props} station={s} />}</Stack.Screen>);

// TODO: Offline maps

const MapView = () => {
    const {height, width} = useWindowDimensions();

    const styles = useMemo(() => StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "white",
            // alignItems: "center",
            // justifyContent: "center",
        },
        map: {
            width,
            height,
        },
    }), [height, width]);

    const InnerMapView = useMemo(() => ({navigation}) => <View style={styles.container}>
        <MapComponent style={styles.map} navigation={navigation} />
    </View>, [styles]);

    return <Stack.Navigator>
        <Stack.Screen name="screen.map.overview" options={{title: "Map"}} component={InnerMapView} />
        {STATION_SCREENS}
    </Stack.Navigator>;
};

export default MapView;
