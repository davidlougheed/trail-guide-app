import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginBottom: 1,
    },
    title: {
        fontSize: 16,
        marginBottom: 4,
    }
});

const StationsListItem = ({shortTitle, subtitle, onPress}) => {
    // TODO: Format content for list item
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.title}>{shortTitle}</Text>
                <Text>{subtitle}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default StationsListItem;
