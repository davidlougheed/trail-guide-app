import React from "react";
import {StyleSheet, Text, View} from "react-native";

const styles = StyleSheet.create({
    container: {
        paddingVertical: 4,
        paddingHorizontal: 16,
        backgroundColor: "rgb(242, 242, 242)",
    },
    text: {
        fontWeight: "bold",
    }
});

const StationsListSectionHeader = React.memo(({title}) => (
    <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
    </View>
));

export default StationsListSectionHeader;
