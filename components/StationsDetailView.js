import React from "react";
import {SafeAreaView, ScrollView, StyleSheet, Text, View, useWindowDimensions} from "react-native";
import RenderHTML from "react-native-render-html";

import LocalImageRenderer from "./LocalImageRenderer";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: "#0F7470",
        margin: 0,
        padding: 16,
    },
    headerTitle: {
        fontSize: 32,
        marginBottom: 12,
        color: "white",
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 8,
        color: "white",
    },
    coordinatesBox: {
        paddingTop: 8,
        borderTopColor: "rgba(255, 255, 255, 0.3)",
        borderTopWidth: 1,
    },
    coordinatesTitle: {
        color: "white",
        fontWeight: "bold",
    },
    coordinatesItem: {
        color: "white",
        marginTop: 4,
    }
});

const renderers = {img: LocalImageRenderer};

const StationsDetailView = ({longTitle, subtitle, coordinatesUTM, content}) => {
    const {east, north, zone} = (coordinatesUTM ?? {});

    const {width} = useWindowDimensions();

    return <SafeAreaView style={styles.container}>
        <ScrollView>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{longTitle}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
                <View style={styles.coordinatesBox}>
                    <Text style={styles.coordinatesTitle}>UTM Coordinates (Zone {zone ?? ""})</Text>
                    <Text style={styles.coordinatesItem}>
                        <Text style={{fontWeight: "bold"}}>East:</Text> {east ?? ""}E</Text>
                    <Text style={styles.coordinatesItem}>
                        <Text style={{fontWeight: "bold"}}>North:</Text> {north ?? ""}N</Text>
                </View>
            </View>
            {(content ?? []).map((c, i) => {
                switch (c.type) {
                    case "html":
                        return <RenderHTML key={i}
                                           source={{html: c.contentBeforeFold}}
                                           contentWidth={width}
                                           baseStyle={{padding: 16}}
                                           renderers={renderers} />;
                }
            })}
        </ScrollView>
    </SafeAreaView>;
};

export default StationsDetailView;
