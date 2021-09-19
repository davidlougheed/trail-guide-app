import React from "react";
import {StyleSheet, Text, View} from "react-native";

const styles = StyleSheet.create({
    container: {
        marginVertical: 4,
        paddingHorizontal: 16,
    },
    text: {
        fontWeight: "bold",
    }
});

const StationsListSectionHeader = ({title}) => (
    <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
    </View>
);

export default StationsListSectionHeader;
