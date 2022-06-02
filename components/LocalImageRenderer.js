// A web interface to manage a trail guide mobile app's content and data.
// Copyright (C) 2021  David Lougheed
// See NOTICE for more information.

import React, {useState} from "react";
import {Image, useWindowDimensions, View} from "react-native";
import {useAssets} from "expo-asset";

import assetData from "../data/assets/assets";
import {getDataFromAssetURI} from "../utils";

const LocalImageRenderer = ({style, tnode: {attributes: {src, width, height}}, ...props}) => {
    const {width: screenWidth} = useWindowDimensions();

    const heightInt = parseInt(height, 10);
    const widthInt = parseInt(width, 10);

    const [viewDimensions, setViewDimensions] = useState(null);

    // Check if source matches an asset URI, i.e. something which works both
    // as a web resource and as a sigil for loading a local asset.
    const serverAssetId = getDataFromAssetURI(src);

    const assetId = assetData?.["image"]?.[serverAssetId ?? src];

    if (!assetId) return <View style={{width: 228, height: 228}} />;

    const [assets, error] = useAssets([assetId]);
    if (error) console.error(error);
    if (!assets) return <View style={{width: 228, height: 228}} />;

    Image.getSize(assets[0].uri, (w, h) => {
        setViewDimensions([w, h]);
    });

    if (!viewDimensions) return <View style={{width: 228, height: 228}} />;
    
    const hwRatio = viewDimensions[1] / viewDimensions[0];

    // Set a max width to something reasonable to the image isn't huge on larger screens;
    // use a smaller max width if the image is vertical.
    const targetWidth = Math.min(screenWidth - 16, hwRatio > 1 ? 228 : 304);

    return <View style={{alignItems: "center", marginTop: 8, marginBottom: 8}} {...props}>
        <Image
            source={assetId}
            style={{
                ...style,
                height: isNaN(heightInt) ? targetWidth * hwRatio : heightInt,
                width: isNaN(widthInt) ? targetWidth : widthInt,
            }}
        />
    </View>
};

export default LocalImageRenderer;
