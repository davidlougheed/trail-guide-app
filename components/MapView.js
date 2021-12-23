import React from "react";
import {Dimensions, Platform, StyleSheet, View} from "react-native";

const InnerMapView = Platform.select({
    native: () => require("./MobileMapComponent"),
    default: () => require("./WebMapComponent"),
})().default;

// TODO: Offline maps

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
});

const MapView = () => {
    return <View style={styles.container}>
        <InnerMapView style={styles.map} />
    </View>;
};

export default MapView;
