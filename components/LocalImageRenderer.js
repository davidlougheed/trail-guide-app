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

    const [viewHeight, setViewHeight] = useState(1);
    const [viewWidth, setViewWidth] = useState(1);

    // Check if source matches an asset URI, i.e. something which works both
    // as a web resource and as a sigil for loading a local asset.
    const serverAssetId = getDataFromAssetURI(src);

    const assetId = assetData["image"][serverAssetId ?? src];

    if (!assetId) return <View />;

    const [assets, error] = useAssets([assetId]);
    if (error) console.error(error);
    if (!assets) return <View />;

    Image.getSize(assets[0].uri, (w, h) => {
        setViewHeight(h);
        setViewWidth(w);
    });

    const targetWidth = Math.min(screenWidth - 16, 400);

    const heightInt = parseInt(height, 10);
    const widthInt = parseInt(width, 10);
    return <Image
        {...props}
        source={assetId}
        style={{
            ...style,
            marginTop: 8,
            marginBottom: 8,
            height: isNaN(heightInt) ? targetWidth * (viewHeight / viewWidth) : heightInt,
            width: isNaN(widthInt) ? targetWidth : widthInt,
        }}
    />
};

export default LocalImageRenderer;
