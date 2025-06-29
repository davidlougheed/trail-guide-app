// A mobile app to display interactive trail guide content.
// Copyright (C) 2021-2024  David Lougheed
// See NOTICE for more information.

import { memo } from "react";
import {StyleSheet, View} from "react-native";
import {useAssets} from "expo-asset";

import assetData from "../data/assets/assets";
import {getDataFromAssetURI} from "../utils";
import AudioPlayer from "./AudioPlayer";

const height = 50;
const width = 320;

const styles = StyleSheet.create({
    blankShell: {height, width},
});

// Supposed to work for both legacy <audio> tags and new <tgcs-audio> tags
const LocalAudioRenderer = memo(({style, tnode, ...props}) => {
    const {domNode} = tnode;

    const src = domNode.attribs["src"] ?? domNode.children?.[0]?.attribs?.["src"];

    // Check if source matches an asset URI, i.e. something which works both
    // as a web resource and as a sigil for loading a local asset.
    const uriData = src ? getDataFromAssetURI(src) : null;

    const srcSplit = (src || "").split("/");
    const source = srcSplit[srcSplit.length - 1].split(".")[0];

    const assetId = assetData?.["audio"]?.[uriData ?? source];

    const blankShell = <View {...props} style={styles.blankShell} />;

    if (!assetId) return blankShell;

    const [assets, error] = useAssets([assetId]);
    if (error) console.error(error);
    if (!assets) return blankShell;

    return <AudioPlayer linkText={domNode.attribs["data-link-text"]} src={assets[0]} />;
});

export default LocalAudioRenderer;
