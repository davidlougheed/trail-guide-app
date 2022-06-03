import React, {useMemo, useState} from "react";
import {SafeAreaView, ScrollView, StyleSheet, useWindowDimensions, View} from "react-native";

import CustomRenderHTML from "./htmlDisplay/CustomRenderHTML";
import PageHeader from "./PageHeader";
import RenderModals from "./RenderModals";

import pageData from "../data/pages.json";
import {pageStyles} from "./lib/sharedStyles";

const pagesById = Object.fromEntries(pageData.map(page => [page.id, page]));

const styles = StyleSheet.create({
    pageContent: {
        backgroundColor: "white",
        paddingHorizontal: 16,
    },
});

const PageView = ({route}) => {
    const {width} = useWindowDimensions();

    const {pageId} = route.params;
    const page = pagesById[pageId] ?? pageData[0];

    const source = useMemo(() => ({html: page.content}), [page]);

    const [modalsVisible, setModalsVisible] = useState({});

    return <>
        <SafeAreaView style={pageStyles.container}>
            <ScrollView>
                <PageHeader page={{long_title: page.long_title}} />
                <View style={styles.pageContent}>
                    <CustomRenderHTML
                        source={source}
                        contentWidth={width}
                        setModalsVisible={setModalsVisible}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
        <RenderModals modalsVisible={modalsVisible} setModalsVisible={setModalsVisible} />
    </>;
}

export default PageView;
