import React, {useState} from "react";
import {
    Button,
    SafeAreaView,
    ScrollView,
    View,

    useWindowDimensions,
} from "react-native";

import CustomRenderHTML from "./htmlDisplay/CustomRenderHTML";
import PageHeader from "./PageHeader";
import Quiz from "./Quiz";

import {pageStyles as styles} from "./lib/sharedStyles";
import Gallery from "./Gallery";

const StationsDetailView = ({station}) => {
    const {width} = useWindowDimensions();
    const [htmlStates, setHtmlStates] = useState({});

    const {contents} = station;

    const readMoreButton = index => {
        // Toggle
        setHtmlStates({...htmlStates, [index]: htmlStates[index] ? undefined : true});
    };

    return <SafeAreaView style={styles.container}>
        <ScrollView>
            <PageHeader station={station} />
            {(contents ?? []).map((c, i) => {
                switch (c.content_type) {
                    case "html":
                        return <View key={i} style={{paddingHorizontal: 16}}>
                            <CustomRenderHTML source={{html: c.content_before_fold}} contentWidth={width} />
                            {c.content_after_fold
                                ? (
                                    <View style={{
                                        backgroundColor: "white",
                                        paddingBottom: htmlStates[i] ? 0 : 16
                                    }}>
                                        <Button title={htmlStates[i] ? "HIDE" : "READ MORE"}
                                                onPress={() => readMoreButton(i)} />
                                    </View>
                                ) : null}
                            {htmlStates[i]
                                ? <CustomRenderHTML source={{html: c.content_after_fold}} contentWidth={width} />
                                : null}
                        </View>;
                    case "gallery":
                        return <Gallery key={i} gallery={c} />;
                    case "quiz":
                        return <Quiz key={i} quiz={c} />;
                }
            })}
        </ScrollView>
    </SafeAreaView>;
};

export default StationsDetailView;
