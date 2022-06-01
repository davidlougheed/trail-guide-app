import React from "react";
import {Dimensions, Platform, StyleSheet, View} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import StationsDetailView from "./StationsDetailView";

import stationData from "../data/stations.json";

const Stack = createNativeStackNavigator();

const MapComponent = Platform.select({
    native: () => require("./MobileMapComponent"),
    default: () => require("./WebMapComponent"),
})().default;

// TODO: Offline maps

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        // alignItems: "center",
        // justifyContent: "center",
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
});

const InnerMapView = ({navigation}) => <View style={styles.container}>
    <MapComponent style={styles.map} navigation={navigation} />
</View>;

const MapView = () => {
    return <Stack.Navigator>
        <Stack.Screen name="screen.map.overview" options={{title: "Map"}} component={InnerMapView} />
        {stationData
            .flatMap(t => t.data)
            .map(s => {
                return <Stack.Screen key={s.title} name={`screen.map.station.${s.title}`} options={{
                    title: s.title,
                }}>{props => <StationsDetailView {...props} station={s} />}</Stack.Screen>;
            })}
    </Stack.Navigator>;
};

export default MapView;
