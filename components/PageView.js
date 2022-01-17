import React, {useState} from "react";
import {SafeAreaView, ScrollView, useWindowDimensions, View} from "react-native";

import CustomModal from "./CustomModal";
import CustomRenderHTML from "./htmlDisplay/CustomRenderHTML";
import PageHeader from "./PageHeader";

import modalData from "../data/modals.json";
import pageData from "../data/pages.json";
import {pageStyles} from "./lib/sharedStyles";
import {getDataFromModalURI} from "../utils";

const pagesById = Object.fromEntries(pageData.map(page => [page.id, page]));

const PageView = ({route}) => {
    const {width} = useWindowDimensions();

    const {pageId} = route.params;
    const page = pagesById[pageId] ?? pageData[0];

    const [modalsVisible, setModalsVisible] = useState({});

    const renderersProps = {
        a: {
            onPress: (event, href) => {
                const modalId = getDataFromModalURI(href);
                if (modalData.hasOwnProperty(modalId)) {
                    setModalsVisible({[modalId]: true});
                } else {
                    // TODO: normal link handling
                }
            },
        },
    };

    return <>
        <SafeAreaView style={pageStyles.container}>
            <ScrollView>
                <PageHeader page={{long_title: page.long_title}} />
                <View style={{backgroundColor: "white", paddingHorizontal: 16}}>
                    <CustomRenderHTML
                        source={{html: page.content}}
                        contentWidth={width}
                        renderersProps={renderersProps}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
        {Object.entries(modalData).map(([k, d]) => {
            const closeModal = () => setModalsVisible({...modalsVisible, [k]: undefined});
            return <CustomModal
                key={k}
                visible={modalsVisible[k] !== undefined}
                data={{content: d.content}}
                onRequestClose={closeModal}
            />;
        })}
    </>;
}

export default PageView;
