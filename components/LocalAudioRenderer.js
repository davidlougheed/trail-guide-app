// A web interface to manage a trail guide mobile app's content and data.
// Copyright (C) 2021  David Lougheed
// See NOTICE for more information.

import React from "react";
import {Platform, View} from "react-native";
import {WebView} from "react-native-webview";
import {useAssets} from "expo-asset";

import assetData from "../data/assets/assets";
import {getBaseUrlAndFileFromURI, getDataFromAssetURI} from "../utils";

const height = 50;
const width = 320;

const LocalAudioRenderer = ({style, tnode, ...props}) => {
    const {domNode: {children}} = tnode;

    const src = children[0].attribs["src"];

    // Check if source matches an asset URI, i.e. something which works both
    // as a web resource and as a sigil for loading a local asset.
    const uriData = getDataFromAssetURI(src);

    const srcSplit = src.split("/");
    const source = srcSplit[srcSplit.length - 1].split(".")[0];

    const assetId = assetData["audio"][uriData ?? source];

    const blankShell = <View {...props} style={{height, width}} />;

    if (!assetId) return blankShell;

    const [assets, error] = useAssets([assetId]);
    if (error) console.error(error);
    if (!assets) return blankShell;

    const [baseUrl, file] = getBaseUrlAndFileFromURI(assets[0].localUri);

    // TODO: use expo-av
    return <View {...props} style={{height, width}}>
        {Platform.OS === "web" ? (
            <audio controls={true} preload="auto">
                <source src={assets[0].localUri} />
            </audio>
        ) : (
            <WebView source={{html: `
                <html lang="en">
                <head>
                    <title>Audio Element</title>
                    <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0">
                </head>
                <body style="margin: 0; padding: 0">
                <audio controls preload="auto">
                    <source src="${file}" />
                </audio>
                </body>
                </html>
            `, baseUrl: baseUrl}} originWhitelist={["*"]} />
        )}
    </View>;
};

export default LocalAudioRenderer;
