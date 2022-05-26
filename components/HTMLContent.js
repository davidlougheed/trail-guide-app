import React, {useCallback, useState} from "react";
import {Button, useWindowDimensions, View} from "react-native";

import CustomRenderHTML from "./htmlDisplay/CustomRenderHTML";

const HTMLContent = ({content, setModalsVisible}) => {
    const {width} = useWindowDimensions();
    const [expanded, setExpanded] = useState(false);

    const readMoreButton = useCallback(() => setExpanded(true), []);

    return <View style={{backgroundColor: "white", paddingHorizontal: 16}}>
        <CustomRenderHTML source={{html: content.content_before_fold}} contentWidth={width} />
        {content.content_after_fold
            ? (
                <View style={{
                    backgroundColor: "white",
                    paddingBottom: expanded ? 0 : 16
                }}>
                    <Button title={expanded ? "HIDE" : "READ MORE"} onPress={readMoreButton} />
                </View>
            ) : null}
        {expanded
            ? (
                <CustomRenderHTML
                    source={{html: content.content_after_fold}}
                    contentWidth={width}
                    setModalsVisible={setModalsVisible}
                />
            ) : null}
    </View>;
};

export default HTMLContent;
