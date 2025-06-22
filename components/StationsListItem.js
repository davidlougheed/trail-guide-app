// A mobile app to display interactive trail guide content.
// Copyright (C) 2021-2024  David Lougheed
// See NOTICE for more information.

import { memo } from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";

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

const STATION_ICONS = {
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
    const icon = STATION_ICONS[category]?.[trail];
    return <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
            {icon ? <Image source={icon} style={styles.icon} /> : null}
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward-outline" style={styles.chevron} size={18} color="#CCCCCC" />
        </View>
    </TouchableOpacity>;
});

export default StationsListItem;
