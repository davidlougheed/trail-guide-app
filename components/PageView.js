import React, {useState} from "react";
import {SafeAreaView, ScrollView, useWindowDimensions, View} from "react-native";

import CustomRenderHTML from "./htmlDisplay/CustomRenderHTML";
import PageHeader from "./PageHeader";
import RenderModals from "./RenderModals";

import pageData from "../data/pages.json";
import {pageStyles} from "./lib/sharedStyles";

const pagesById = Object.fromEntries(pageData.map(page => [page.id, page]));

const PageView = ({route}) => {
    const {width} = useWindowDimensions();

    const {pageId} = route.params;
    const page = pagesById[pageId] ?? pageData[0];

    const [modalsVisible, setModalsVisible] = useState({});

    return <>
        <SafeAreaView style={pageStyles.container}>
            <ScrollView>
                <PageHeader page={{long_title: page.long_title}} />
                <View style={{backgroundColor: "white", paddingHorizontal: 16}}>
                    <CustomRenderHTML
                        source={{html: page.content}}
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
