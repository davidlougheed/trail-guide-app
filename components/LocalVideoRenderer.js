import React from "react";
import {Image, View} from "react-native";
import {Video} from "expo-av";
import {useAssets} from "expo-asset";

import LocalVideos from "../data/video/LocalVideos";
//{children, style, tnode: {attributes: {width, height}}, ...props}
const LocalVideoRenderer = ({style, tnode, ...props}) => {
    const {attributes: {width, height}, domNode: {children}} = tnode;

    console.log(tnode);

    const src = children[0].attribs["src"];

    const srcSplit = src.split("/");
    const source = srcSplit[srcSplit.length - 1].split(".")[0];

    const assetId = LocalVideos[source];

    if (!assetId) return <View />;

    useAssets([assetId]);

    const heightInt = parseInt(height, 10);
    const widthInt = parseInt(width, 10);

    return <View {...props} style={{
        // TODO: Dynamic width based on screen size - up to max
        height: isNaN(heightInt) ? 180 : heightInt,
        width: isNaN(widthInt) ? 320 : widthInt,
    }}>
        <Video source={assetId} useNativeControls={true} resizeMode="contain"/>
    </View>;
};

export default LocalVideoRenderer;
