import React, {useMemo} from "react";
import {Dimensions, Platform, StyleSheet, useWindowDimensions, View} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import StationsDetailView from "./StationsDetailView";

import stationData from "../data/stations.json";

const Stack = createNativeStackNavigator();

import MapComponent from "./MapComponent";

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
        {stationData
            .flatMap(t => t.data)
            .map(s => {
                return <Stack.Screen key={s.title} name={`screen.map.station.${s.id}`} options={{
                    title: s.title,
                }}>{props => <StationsDetailView {...props} station={s} />}</Stack.Screen>;
            })}
    </Stack.Navigator>;
};

export default MapView;
