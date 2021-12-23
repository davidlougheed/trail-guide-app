import React from "react";
import {
    Dimensions,
    StyleSheet,

    Image,
    Text,
    View,

    useWindowDimensions,
} from "react-native";
import {useAssets} from "expo-asset";
import PagerView from "react-native-pager-view";

import assetData from "../data/assets/assets";
import CustomRenderHTML from "./htmlDisplay/CustomRenderHTML";

const styles = StyleSheet.create({
    galleryContainer: {
        marginTop: 2,  // Leave a gap to show a little divider line
        padding: 16,
        backgroundColor: "white",
    },

    galleryTitle: {
        fontSize: 20,
        marginBottom: 12,
    },

    pager: {
        width: "100%",
        minHeight: (Dimensions.get("window").width - 32) * (9/16),
    },

    galleryItemContainer: {
        width: "100%",
        height: "100%",
    },

    galleryImage: {
        width: "100%",
        height: "100%",
    },

    caption: {
        fontSize: 12,
        color: "#999",
    },

    helpText: {
        marginTop: 16,
        fontSize: 11,
        color: "#AAA",
    },
});

const Gallery = ({gallery}) => {
    const {title, description, items} = gallery;
    const {width} = useWindowDimensions();

    const itemAssets = items.map(i => [i.asset, assetData["image"][i.asset]]);
    const itemAssetsObj = Object.fromEntries(itemAssets);

    useAssets(itemAssets.map(i => i[1]).filter(i => i));

    return <View style={styles.galleryContainer}>
        {gallery.title ? <Text style={styles.galleryTitle}>{title}</Text> : null}
        <CustomRenderHTML source={{html: description}} contentWidth={width} showPageIndicator={true} />
        <PagerView style={styles.pager} initialPage={0} pageMargin={16}>
            {items.map(({asset, caption}, i) => <View key={i} style={styles.galleryItemContainer}>
                <Image style={styles.galleryImage} source={itemAssetsObj[asset]} />
                {caption ? <Text style={styles.caption}>{caption}</Text> : null}
            </View>)}
        </PagerView>
        <Text style={styles.helpText}>Swipe to scroll through the gallery.</Text>
    </View>;
};

export default Gallery;
