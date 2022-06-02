// A web interface to manage a trail guide mobile app's content and data.
// Copyright (C) 2021-2022  David Lougheed
// See NOTICE for more information.

import React, {useRef} from "react";
import {View} from "react-native";
import {useAssets} from "expo-asset";
import {Video} from "expo-av";

import assetData from "../data/assets/assets";
import {getDataFromAssetURI} from "../utils";

const LocalVideoRenderer = ({style, tnode, ...props}) => {
    const video = useRef(null);

    const {attributes: {width: widthAttr, height: heightAttr}, domNode: {children}} = tnode;

    const heightAttrInt = parseInt(heightAttr, 10);
    const widthAttrInt = parseInt(widthAttr, 10);

    // TODO: Dynamic width based on screen size - up to max
    const height = isNaN(heightAttrInt) ? 180 : heightAttrInt;
    const width = isNaN(widthAttrInt) ? 320 : widthAttrInt;

    const src = children[0].attribs["src"];

    // Check if source matches an asset URI, i.e. something which works both
    // as a web resource and as a sigil for loading a local asset.
    const uriData = getDataFromAssetURI(src);

    const srcSplit = src.split("/");
    const source = srcSplit[srcSplit.length - 1].split(".")[0];

    const assetId = assetData?.["video"]?.[uriData ?? source];

    const blankShell = <View {...props} style={{height, width}} />;

    if (!assetId) return blankShell;

    const [assets, error] = useAssets([assetId]);
    if (error) console.error(error);
    if (!assets) return blankShell;

    return <View {...props} style={{height, width}}>
        <Video ref={video}
               source={assets[0]}
               resizeMode="contain"
               useNativeControls={true} />
    </View>;
};

export default LocalVideoRenderer;
