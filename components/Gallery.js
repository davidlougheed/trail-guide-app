import React from "react";
import {
    Dimensions,
    Platform,
    StyleSheet,

    Image,
    Text,
    View,

    useWindowDimensions,
} from "react-native";
import {useAssets} from "expo-asset";

const PagerView = Platform.select({
    native: () => require("react-native-pager-view"),
    default: () => require("./WebPagerView"),
})().default;

import assetData from "../data/assets/assets";
import CustomRenderHTML from "./htmlDisplay/CustomRenderHTML";

const galleryMaxWidth = 600;
const galleryHeight = Math.min(Dimensions.get("window").width - 32, galleryMaxWidth) * (9/16);
const styles = StyleSheet.create({
    galleryContainer: {
        marginTop: 2,  // Leave a gap to show a little divider line
        padding: 16,
        backgroundColor: "white",
    },

    galleryTitle: {
        fontSize: 20,
        marginBottom: 6,
        textAlign: "center",
    },
    
    pagerFlexContainer: {
        width: "100%",
        alignItems: "center", 
    },
    
    pagerInnerContainer: {
        width: "100%", 
        maxWidth: galleryMaxWidth,
    },

    pager: {
        width: "100%",
        minHeight: galleryHeight,
    },

    galleryItemContainer: {
        width: "100%",
        minHeight: galleryHeight,
    },

    galleryImage: {
        width: "100%",
        height: "100%",
    },

    caption: {
        fontSize: 14,
        color: "#999",
    },

    helpText: {
        marginTop: 16,
        fontSize: 13,
        color: "#AAA",
    },
});

const Gallery = React.memo(({gallery, setModalsVisible}) => {
    const {title, description, items} = gallery;
    const {width} = useWindowDimensions();

    const itemAssets = items.map(i => [i.asset, assetData["image"][i.asset]]);
    const itemAssetsObj = Object.fromEntries(itemAssets);

    useAssets(itemAssets.map(i => i[1]).filter(i => i));

    return <View style={styles.galleryContainer}>
        {gallery.title ? <Text style={styles.galleryTitle}>{title}</Text> : null}
        <CustomRenderHTML
            source={{html: description}}
            contentWidth={width}
            showPageIndicator={true}
            setModalsVisible={setModalsVisible}
        />
        <View style={styles.pagerFlexContainer}>
            <View style={styles.pagerInnerContainer}>
                <PagerView style={styles.pager} initialPage={0} pageMargin={16}>
                    {items.map(({asset, caption}, i) => <View key={i} style={styles.galleryItemContainer}>
                        <Image style={styles.galleryImage} source={itemAssetsObj[asset]} />
                        {caption ? <Text style={styles.caption}>{caption}</Text> : null}
                    </View>)}
                </PagerView>
                <Text style={styles.helpText}>Swipe to scroll through the gallery.</Text>
            </View>
        </View>
    </View>;
});

export default Gallery;
