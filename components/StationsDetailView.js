import React, {useState} from "react";
import {
    Button,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,

    useWindowDimensions,
} from "react-native";
import RenderHTML, {HTMLContentModel, HTMLElementModel} from "react-native-render-html";

import LocalImages from "../data/img/LocalImages";

import htmlStyles from "../styles/htmlStyles";
import htmlRenderers from "../htmlRenderers";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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

        textShadowColor: "rgba(0, 0, 0, 0.8)",
        textShadowOffset: {width: 1, height: 3},
        textShadowRadius: 3,
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 8,
        color: "white",

        textShadowColor: "rgba(0, 0, 0, 0.8)",
        textShadowOffset: {width: 1, height: 3},
        textShadowRadius: 3,
    },
    coordinatesBox: {
        paddingTop: 8,
        borderTopColor: "rgba(255, 255, 255, 0.3)",
        borderTopWidth: 1,
    },
    coordinatesTitle: {
        color: "white",
        fontWeight: "bold",

        textShadowColor: "rgba(0, 0, 0, 0.8)",
        textShadowOffset: {width: 1, height: 3},
        textShadowRadius: 3,
    },
    coordinatesItem: {
        color: "white",
        marginTop: 4,

        textShadowColor: "rgba(0, 0, 0, 0.8)",
        textShadowOffset: {width: 1, height: 3},
        textShadowRadius: 3,
    }
});

const StationsDetailView = ({headerImage, longTitle, subtitle, coordinatesUTM, content}) => {
    const {east, north, zone} = (coordinatesUTM ?? {});

    const {width} = useWindowDimensions();

    const [htmlStates, setHtmlStates] = useState({});

    const readMoreButton = index => {
        // Toggle
        setHtmlStates({...htmlStates, [index]: htmlStates[index] ? undefined : true});
    };

    return <SafeAreaView style={styles.container}>
        <ScrollView>
            <View style={styles.header}>
                <ImageBackground source={LocalImages[headerImage]} resizeMode="cover" style={styles.headerBackground}>
                    <Text style={styles.headerTitle}>{longTitle}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                    <View style={styles.coordinatesBox}>
                        <Text style={styles.coordinatesTitle}>UTM Coordinates (Zone {zone ?? ""})</Text>
                        <Text style={styles.coordinatesItem}>
                            <Text style={{fontWeight: "bold"}}>East:</Text> {east ?? ""}E</Text>
                        <Text style={styles.coordinatesItem}>
                            <Text style={{fontWeight: "bold"}}>North:</Text> {north ?? ""}N</Text>
                    </View>
                </ImageBackground>
            </View>
            {(content ?? []).map((c, i) => {
                switch (c.type) {
                    case "html":
                        return <View key={i}>
                            <RenderHTML source={{html: c.contentBeforeFold}}
                                        contentWidth={width}
                                        baseStyle={htmlStyles.base}
                                        tagsStyles={htmlStyles.tags}
                                        renderers={htmlRenderers}
                                        customHTMLElementModels={{
                                            "video": HTMLElementModel.fromCustomModel({
                                                tagName: "video",
                                                contentModel: HTMLContentModel.block,
                                            }),
                                        }}
                            />
                            {c.contentAfterFold
                                ? (
                                    <View style={{
                                        backgroundColor: "white",
                                        paddingHorizontal: 16,
                                        paddingBottom: htmlStates[i] ? 0 : 16
                                    }}>
                                        <Button title={htmlStates[i] ? "HIDE" : "READ MORE"}
                                                onPress={() => readMoreButton(i)} />
                                    </View>
                                ) : null}
                            {htmlStates[i]
                                ? <RenderHTML source={{html: c.contentAfterFold}}
                                              contentWidth={width}
                                              baseStyle={htmlStyles.base}
                                              tagsStyles={htmlStyles.tags}
                                              renderers={htmlRenderers} />
                                : null}
                        </View>;
                }
            })}
        </ScrollView>
    </SafeAreaView>;
};

export default StationsDetailView;
