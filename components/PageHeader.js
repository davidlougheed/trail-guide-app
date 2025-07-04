// A mobile app to display interactive trail guide content.
// Copyright (C) 2021-2024  David Lougheed
// See NOTICE for more information.

import { memo } from "react";
import {ImageBackground, StyleSheet, Text, View} from "react-native";
import {useAssets} from "expo-asset";

import assetData from "../data/assets/assets";

const textShadow = {
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: {width: 1, height: 3},
    textShadowRadius: 3,
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#0F7470",
        margin: 0,
    },
    headerBackground: {
        padding: 16,
    },
    headerTitle: {
        fontSize: 32,
        marginBottom: 12,
        color: "white",
        ...textShadow,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 8,
        color: "white",
        ...textShadow,
    },
    coordinatesBox: {
        paddingTop: 8,
        borderTopColor: "rgba(255, 255, 255, 0.3)",
        borderTopWidth: 1,
    },
    coordinatesTitle: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
        ...textShadow,
    },
    coordinatesItem: {
        color: "white",
        marginTop: 4,
        fontSize: 18,
        ...textShadow,
    },
});

const PageHeader = memo(({station, page}) => {
    const {header_image, long_title, subtitle, coordinates_utm} = station ?? page;
    const {crs, east, north, zone} = (coordinates_utm ?? {});

    const assetId = assetData?.["image"]?.[header_image] ?? null;

    if (assetId) {
        useAssets([assetId]);
    }

    return <View style={styles.header}>
        <ImageBackground {...(assetId ? {source: assetId} : {})} resizeMode="cover" style={styles.headerBackground}>
            <Text style={styles.headerTitle}>{long_title}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
            {coordinates_utm ? (
                <View style={styles.coordinatesBox}>
                    <Text style={styles.coordinatesTitle}>UTM Coordinates ({crs ?? ""} Zone {zone ?? ""})</Text>
                    <Text style={styles.coordinatesItem}>
                        <Text style={{fontWeight: "bold"}}>East:</Text> {east ?? ""}E</Text>
                    <Text style={styles.coordinatesItem}>
                        <Text style={{fontWeight: "bold"}}>North:</Text> {north ?? ""}N</Text>
                </View>
            ) : null}
        </ImageBackground>
    </View>;
});

export default PageHeader;
