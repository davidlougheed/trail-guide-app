// A mobile app to display interactive trail guide content.
// Copyright (C) 2021-2022  David Lougheed
// See NOTICE for more information.

import React, {useMemo, useState} from "react";
import {SafeAreaView, ScrollView, StyleSheet, useWindowDimensions, View} from "react-native";

import CustomRenderHTML from "./htmlDisplay/CustomRenderHTML";
import PageHeader from "./PageHeader";
import RenderModals from "./RenderModals";

import {pageData, pagesById} from "../dataSources";
import {pageStyles} from "./lib/sharedStyles";

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
    const pageHeaderData = useMemo(() => ({long_title: page.long_title}), [page]);

    const source = useMemo(() => ({html: page.content}), [page]);

    const [modalsVisible, setModalsVisible] = useState({});

    return <>
        <SafeAreaView style={pageStyles.container}>
            <ScrollView>
                <PageHeader page={pageHeaderData} />
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
