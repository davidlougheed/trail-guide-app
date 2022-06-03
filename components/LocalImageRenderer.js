// A web interface to manage a trail guide mobile app's content and data.
// Copyright (C) 2021  David Lougheed
// See NOTICE for more information.

import React, {useCallback, useEffect, useState} from "react";
import {Image, Modal, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import {ReactNativeZoomableView} from "@openspacelabs/react-native-zoomable-view";
import {useAssets} from "expo-asset";

import assetData from "../data/assets/assets";
import {getDataFromAssetURI} from "../utils";

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    closeButton: {
        position: "absolute",
        top: 20,
        right: 16,
        zIndex: 99,
    },
    closeButtonText: {
        color: "white",
        fontSize: 28
    },
});

const LocalImageRenderer = ({style, tnode: {attributes: {src, width, height}}, ...props}) => {
    const {width: screenWidth} = useWindowDimensions();

    const [modalVisible, setModalVisible] = useState(false);
    const openModal = useCallback(() => setModalVisible(true), []);
    const closeModal = useCallback(() => setModalVisible(false), []);

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

    useEffect(() => {
        if (!assets) return;
        Image.getSize(assets[0].uri, (w, h) => {
            setViewDimensions([w, h]);
        });
    }, [assets])

    if (!assets || !viewDimensions) return <View style={{width: 228, height: 228}} />;

    const hwRatio = viewDimensions[1] / viewDimensions[0];

    // Set a max width to something reasonable to the image isn't huge on larger screens;
    // use a smaller max width if the image is vertical.
    const targetWidth = Math.min(screenWidth - 16, hwRatio > 1 ? 228 : 304);

    return <View style={{alignItems: "center", marginTop: 8, marginBottom: 8}} {...props}>
        <Modal visible={modalVisible}
               animationType="fade"
               transparent={true}
               onRequestClose={closeModal}>
            <View style={styles.modalContainer} onPress={e => console.log(e)}>
                <TouchableOpacity onPress={closeModal}
                                  style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>&#10005;</Text>
                </TouchableOpacity>
                <ReactNativeZoomableView
                    minZoom={1}
                    maxZoom={2}
                    onSingleTap={(e) => {
                        // noinspection JSUnresolvedVariable
                        if (e.target.viewConfig && e.target.viewConfig.Manager !== "ImageViewManager") {
                            // Hacky outside-image tap detect (native only)
                            closeModal();
                        }
                    }}
                    onShiftingEnd={(_e, g, z) => {
                        if (g.vy > 0.3 && g.dy > 110 && z.zoomLevel < 1.2) {
                            closeModal();
                        }
                    }}>
                    <Image
                        source={assetId}
                        style={{
                            height: Math.min(screenWidth, viewDimensions[0]) * hwRatio,
                            width: Math.min(screenWidth, viewDimensions[0]),
                        }}
                    />
                </ReactNativeZoomableView>
            </View>
        </Modal>
        <TouchableOpacity onPress={openModal}>
            <Image
                source={assetId}
                style={{
                    ...style,
                    height: isNaN(heightInt) ? targetWidth * hwRatio : heightInt,
                    width: isNaN(widthInt) ? targetWidth : widthInt,
                }}
            />
        </TouchableOpacity>
    </View>
};

export default LocalImageRenderer;
