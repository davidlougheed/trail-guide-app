// A mobile app to display interactive trail guide content.
// Copyright (C) 2021-2025  David Lougheed
// See NOTICE for more information.

import React, { memo } from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Svg, {Path} from "react-native-svg";
import {Ionicons} from "@expo/vector-icons";

import {localDataProvider} from "../dataSources";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginBottom: 1,
        flexDirection: "row",
    },
    textContainer: {
        flex: 1,
        marginLeft: 16,
    },
    icon: {
        marginVertical: "auto",
        width: 24,
        height: 24,
    },
    chevron: {
        marginVertical: "auto",
    },
    title: {
        fontSize: 16,
        marginBottom: 4,
    },
    subtitle: {},
});

// Old, ELEEC-specific icons - kept as a fallback.
const LEGACY_STATION_ICONS = {
    "culture": {
        "blue": require("../assets/culture-blue.png"),
        "green": require("../assets/culture-green.png"),
        "orange": require("../assets/culture-orange.png"),
        "red": require("../assets/culture-red.png"),
        "acc": require("../assets/culture-red.png"),
        "other": require("../assets/culture-other.png"),
    },
    "environment": {
        "blue": require("../assets/environment-blue.png"),
        "green": require("../assets/environment-green.png"),
        "orange": require("../assets/environment-orange.png"),
        "red": require("../assets/environment-red.png"),
        "acc": require("../assets/environment-red.png"),
        "other": require("../assets/environment-other.png"),
    },
    "research": {
        "blue": require("../assets/research-blue.png"),
        "green": require("../assets/research-green.png"),
        "orange": require("../assets/research-orange.png"),
        "red": require("../assets/research-red.png"),
        "acc": require("../assets/research-red.png"),
        "other": require("../assets/research-other.png"),
    },
};

const StationsListItem = memo(({title, subtitle, onPress, trail, category}) => {
    // TODO: Format content for list item

    const svgIcon = localDataProvider.categories[category]?.["icon_svg"];
    const legacyIcon = LEGACY_STATION_ICONS[category]?.[trail];
    const colorHex = localDataProvider.sections[trail].color;
    const color = colorHex ? `#${colorHex}` : "black";

    return <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
            {svgIcon ? (
                <Svg height="25" width="25" viewBox="1 1 23 24" style={styles.icon}>
                    <Path fill={color} d={svgIcon} />
                </Svg>
            ) : legacyIcon ? <Image source={legacyIcon} style={styles.icon} /> : null}
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward-outline" style={styles.chevron} size={18} color="#CCCCCC" />
        </View>
    </TouchableOpacity>;
});

export default StationsListItem;
