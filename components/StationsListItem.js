import React from "react";
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
    "research": {
        "blue": require("../assets/research-blue.png"),
        "green": require("../assets/research-green.png"),
        "orange": require("../assets/research-orange.png"),
        "red": require("../assets/research-red.png"),
        "other": require("../assets/research-other.png"),
    }
};

const StationsListItem = ({title, subtitle, onPress, trail, category}) => {
    // TODO: Format content for list item
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Image source={STATION_ICONS[category][trail]} style={styles.icon} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                </View>
                <Ionicons name="chevron-forward-outline" style={styles.chevron} size={18} color="#CCCCCC" />
            </View>
        </TouchableOpacity>
    );
}

export default StationsListItem;
