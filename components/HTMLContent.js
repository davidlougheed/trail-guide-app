// A mobile app to display interactive trail guide content.
// Copyright (C) 2021-2022  David Lougheed
// See NOTICE for more information.

import React, {useCallback, useMemo, useState} from "react";
import {Button, StyleSheet, useWindowDimensions, View} from "react-native";

import CustomRenderHTML from "./htmlDisplay/CustomRenderHTML";

const styles = StyleSheet.create({
    htmlContainer: {
        backgroundColor: "white",
        paddingHorizontal: 16,
    },
});

const HTMLContent = React.memo(({content, setModalsVisible}) => {
    const {width} = useWindowDimensions();
    const [expanded, setExpanded] = useState(false);

    const preFoldSource = useMemo(() => ({html: content.content_before_fold}), [content]);
    const postFoldSource = useMemo(() => ({html: content.content_after_fold}), [content]);

    const readMoreButton = useCallback(() => setExpanded(!expanded), [expanded]);
    const readMoreButtonStyle = useMemo(() => ({
        backgroundColor: "white",
        paddingBottom: expanded ? 0 : 16,
    }), [expanded]);

    const commonHTMLProps = useMemo(() => ({
        contentWidth: width,
        setModalsVisible,
    }), [width, setModalsVisible]);

    return <View style={styles.htmlContainer}>
        <CustomRenderHTML source={preFoldSource} {...commonHTMLProps} />
        {content.content_after_fold
            ? (
                <View style={readMoreButtonStyle}>
                    <Button title={expanded ? "HIDE" : "READ MORE"} onPress={readMoreButton} />
                </View>
            ) : null}
        {expanded ? <CustomRenderHTML source={postFoldSource} {...commonHTMLProps} /> : null}
    </View>;
});

export default HTMLContent;
