import React, {useState} from "react";
import {
    SafeAreaView,
    ScrollView,
    View,
} from "react-native";

import Gallery from "./Gallery";
import HTMLContent from "./HTMLContent";
import PageHeader from "./PageHeader";
import RenderModals from "./RenderModals";
import Quiz from "./Quiz";

import {pageStyles as styles} from "./lib/sharedStyles";

/**
 * Component showing a rendered station with all content.
 * @param {{
 *  contents: Array.<{
 *   title: string|null,
 *   content_type: string,
 *   quiz_type: string|undefined,
 *   question: string|undefined,
 *   answer: string|undefined,
 *   options: string|undefined
 *  }>
 * }} station
 * @return {JSX.Element}
 * @constructor
 */
const StationsDetailView = ({station}) => {
    const [modalsVisible, setModalsVisible] = useState({});

    const {contents} = station;

    return <>
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <PageHeader station={station} />
                {contents.map((c, i) => {
                    switch (c.content_type) {
                        case "html":
                            return <HTMLContent key={i} content={c} setModalsVisible={setModalsVisible} />;
                        case "gallery":
                            return <Gallery key={i} gallery={c} setModalsVisible={setModalsVisible} />;
                        case "quiz":
                            return <Quiz key={i} quiz={c} setModalsVisible={setModalsVisible} />;
                        default:
                            return <View key={i} />;
                    }
                })}
            </ScrollView>
        </SafeAreaView>
        <RenderModals modalsVisible={modalsVisible} setModalsVisible={setModalsVisible} />
    </>;
};

export default StationsDetailView;
