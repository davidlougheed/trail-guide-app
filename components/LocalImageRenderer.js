// A web interface to manage a trail guide mobile app's content and data.
// Copyright (C) 2021  David Lougheed
// See NOTICE for more information.

import React from "react";
import {Image, View} from "react-native";
import {useAssets} from "expo-asset";

import assetData from "../data/assets/assets";

const LocalImageRenderer = ({style, tnode: {attributes: {src, width, height}}, ...props}) => {
    const srcSplit = src.split("/");
    const source = srcSplit[srcSplit.length - 1].split(".")[0];

    const assetId = assetData["image"][source];

    if (!assetId) return <View />;

    useAssets([assetId]);

    const heightInt = parseInt(height, 10);
    const widthInt = parseInt(width, 10);
    return <Image {...props}
                  source={assetId}
                  style={{
                      ...style,
                      height: isNaN(heightInt) ? 50 : heightInt,
                      width: isNaN(widthInt) ? 50 : widthInt,
                  }} />
};

export default LocalImageRenderer;
