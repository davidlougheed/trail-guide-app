// A web interface to manage a trail guide mobile app's content and data.
// Copyright (C) 2021  David Lougheed
// See NOTICE for more information.

import React from "react";
import {Platform, View} from "react-native";
import {WebView} from "react-native-webview";
import {useAssets} from "expo-asset";

import assetData from "../data/assets/assets";
import {getDataFromAssetURI} from "../utils";

const LocalVideoRenderer = ({style, tnode, ...props}) => {
    const {attributes: {width, height}, domNode: {children}} = tnode;

    const heightInt = parseInt(height, 10);
    const widthInt = parseInt(width, 10);

    // TODO: Dynamic width based on screen size - up to max
    const heightFinal = isNaN(heightInt) ? 180 : heightInt;
    const widthFinal = isNaN(widthInt) ? 320 : widthInt;

    const src = children[0].attribs["src"];

    // Check if source matches an asset URI, i.e. something which works both
    // as a web resource and as a sigil for loading a local asset.
    const uriData = getDataFromAssetURI(src);

    const srcSplit = src.split("/");
    const source = srcSplit[srcSplit.length - 1].split(".")[0];

    const assetId = assetData["video"][uriData ?? source];

    const blankShell = <View {...props} style={{height: heightFinal, width: widthFinal}} />;

    if (!assetId) return blankShell;

    const [assets, error] = useAssets([assetId]);
    if (error) console.error(error);

    if (!assets) {
        return blankShell;
    }

    const localUri = assets[0].localUri;
    const baseUrl = localUri.substring(7, localUri.lastIndexOf("/") + 1);
    const file = localUri.substring(localUri.lastIndexOf("/") + 1, localUri.length);

    // expo-av sucks; for now, use a native video tag for web and a WebView for native
    // TODO: This has since been fixed in expo 44, so we can revert to it
    return <View {...props} style={{height: heightFinal, width: widthFinal}}>
        {/*<Video source={{uri: assets[0].localUri}}*/}
        {/*       resizeMode="contain"*/}
        {/*       useNativeControls={true} />*/}
        {Platform.OS === "web" ? (
            <video height={heightFinal}
                   width={widthFinal}
                   controls={true}
                   preload="auto">
                <source src={assets[0].localUri} />
            </video>
        ) : (
            <WebView source={{html: `
                <html lang="en">
                <head>
                    <title>Video Element</title>
                    <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0">
                </head>
                <body style="margin: 0; padding: 0">
                <video height="${heightFinal}" 
                       width="${widthFinal}"
                       controls 
                       preload="auto">
                    <source src="${file}" />
                </video>
                </body>
                </html>
            `, baseUrl: baseUrl}} originWhitelist={["*"]} />
        )}
    </View>;
};

export default LocalVideoRenderer;
