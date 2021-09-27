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

import {pageStyles as styles} from "./lib/sharedStyles";

const StationsDetailView = ({headerImage, longTitle, subtitle, coordinatesUTM, content}) => {
    const {width} = useWindowDimensions();
    const [htmlStates, setHtmlStates] = useState({});

    const readMoreButton = index => {
        // Toggle
        setHtmlStates({...htmlStates, [index]: htmlStates[index] ? undefined : true});
    };

    return <SafeAreaView style={styles.container}>
        <ScrollView>
            <PageHeader headerImage={headerImage}
                        longTitle={longTitle}
                        subtitle={subtitle}
                        coordinatesUTM={coordinatesUTM} />
            {(content ?? []).map((c, i) => {
                switch (c.content_type) {
                    case "html":
                        return <View key={i}>
                            <CustomRenderHTML source={{html: c.contentBeforeFold}} contentWidth={width} />
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
                                ? <CustomRenderHTML source={{html: c.contentAfterFold}} contentWidth={width} />
                                : null}
                        </View>;
                }
            })}
        </ScrollView>
    </SafeAreaView>;
};

export default StationsDetailView;
