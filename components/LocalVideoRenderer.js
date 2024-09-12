// A mobile app to display interactive trail guide content.
// Copyright (C) 2021-2023  David Lougheed
// See NOTICE for more information.
// noinspection JSValidateTypes

import { memo, useRef } from "react";
import {Text, useWindowDimensions, View} from "react-native";
import {useAssets} from "expo-asset";
import {Video} from "expo-av";

import assetData from "../data/assets/assets";
import {getDataFromAssetURI} from "../utils";

const LocalVideoRenderer = memo(({style, tnode, ...props}) => {
    const {width: screenWidth} = useWindowDimensions();

    const video = useRef(null);

    const {
        attributes: {width: widthAttr, height: heightAttr},
        domNode: {children, attribs: {src: srcAttr, poster: posterAttr}},
    } = tnode;

    const heightAttrInt = parseInt(heightAttr, 10);
    const widthAttrInt = parseInt(widthAttr, 10);

    // TODO: Non-fixed aspect ratio
    const height = Math.min(isNaN(heightAttrInt) ? 180 : heightAttrInt, (screenWidth - 32) * (9/16));
    const width = Math.min(isNaN(widthAttrInt) ? 320 : widthAttrInt, screenWidth - 32);

    /** @type string|null */
    const posterSrc = posterAttr ?? null;
    const videoSrc = srcAttr ?? children?.[0]?.attribs?.["src"] ?? null;

    const posterUriData = posterSrc ? getDataFromAssetURI(posterSrc) : null;

    const posterSrcSplit = (posterSrc ?? "").split("/");
    const posterSource = posterSrcSplit[posterSrcSplit.length - 1].split(".")[0];

    // Check if source matches an asset URI, i.e. something which works both
    // as a web resource and as a sigil for loading a local asset.
    const uriData = videoSrc ? getDataFromAssetURI(videoSrc) : null;

    const videoSrcSplit = (videoSrc ?? "").split("/");
    const videoSource = videoSrcSplit[videoSrcSplit.length - 1].split(".")[0];

    const posterAssetId = assetData?.["image"]?.[posterUriData ?? posterSource];
    const videoAssetId = assetData?.["video"]?.[uriData ?? videoSource];

    const hasPoster = !!posterAssetId;
    const hasVideo = !!videoAssetId;

    const blankShell = <View {...props} style={{height, width}}><Text>Loading...</Text></View>;

    if (!videoAssetId) return blankShell;

    const [assets, error] = useAssets([
        ...(hasPoster ? [posterAssetId] : []),
        ...(hasVideo ? [videoAssetId] : [])
    ]);
    if (error) console.error(error);
    if (!assets) return blankShell;

    const videoProps = {};
    if (hasPoster) {
        videoProps.posterSource = assets[0];
        if (hasVideo) videoProps.source = assets[1];
    } else if (hasVideo) {
        videoProps.source = assets[0];
    }

    // TODO: videoStyle prop for next version
    return <View {...props} style={{height, width}}>
        <Video ref={video}
               style={{height, width}}
               {...videoProps}
               usePoster={hasPoster}
               resizeMode="contain"
               useNativeControls={true} />
    </View>;
});

export default LocalVideoRenderer;
