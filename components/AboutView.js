import React, {useEffect, useState} from "react";
import {Platform, SafeAreaView, ScrollView, useWindowDimensions} from "react-native";
import {useAssets} from "expo-asset";
import {readAsStringAsync} from "expo-file-system";
import RenderHTML from "react-native-render-html";

import LocalImageRenderer from "./LocalImageRenderer";

// Cannot use StyleSheet with RenderHTML
const styles = {
    ids: {
        header: {
            backgroundColor: "#0F7470",
            color: "white",
            margin: 0,
            padding: 16,
            fontWeight: "normal",
        },
        content: {
            paddingHorizontal: 16,
            backgroundColor: "white",
        },
    },
};

import aboutHTMLWeb from "../data/about.html";
const renderers = {img: LocalImageRenderer};

const AboutView = () => {
    const {width} = useWindowDimensions();

    const [assets, error] = useAssets([require("../data/about.html")]);
    if (error) console.error(error);

    const [aboutHTML, setAboutHTML] = useState("<div></div>");

    useEffect(() => {
        if (!assets) return;
        if (Platform.OS === "web") {
            setAboutHTML(aboutHTMLWeb);
        } else {
            (async () => {
                setAboutHTML(await readAsStringAsync(assets[0].localUri));
            })();
        }
    }, [assets]);

    return <SafeAreaView style={{flex: 1}}>
        <ScrollView>
            <RenderHTML source={{html: aboutHTML}}
                        contentWidth={width}
                        idsStyles={styles.ids}
                        renderers={renderers} />
        </ScrollView>
    </SafeAreaView>;
}

export default AboutView;
