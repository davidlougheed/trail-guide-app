import React from "react";
import {ImageBackground, StyleSheet, Text, View} from "react-native";
import {useAssets} from "expo-asset";

import LocalImages from "../data/img/LocalImages";

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
        fontSize: 14,
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
        ...textShadow,
    },
    coordinatesItem: {
        color: "white",
        marginTop: 4,
        ...textShadow,
    },
});

const PageHeader = ({headerImage, longTitle, subtitle, coordinatesUTM}) => {
    const {east, north, zone} = (coordinatesUTM ?? {});

    const assetId = LocalImages[headerImage];

    if (assetId) {
        useAssets([assetId]);
    }

    return <View style={styles.header}>
        <ImageBackground source={assetId} resizeMode="cover" style={styles.headerBackground}>
            <Text style={styles.headerTitle}>{longTitle}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
            {coordinatesUTM ? (
                <View style={styles.coordinatesBox}>
                    <Text style={styles.coordinatesTitle}>UTM Coordinates (Zone {zone ?? ""})</Text>
                    <Text style={styles.coordinatesItem}>
                        <Text style={{fontWeight: "bold"}}>East:</Text> {east ?? ""}E</Text>
                    <Text style={styles.coordinatesItem}>
                        <Text style={{fontWeight: "bold"}}>North:</Text> {north ?? ""}N</Text>
                </View>
            ) : null}
        </ImageBackground>
    </View>;
};

export default PageHeader;
