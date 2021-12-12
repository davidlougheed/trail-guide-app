import React from "react";
import {
    StyleSheet,

    Text,
    View,

    useWindowDimensions,
} from "react-native";

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
});

const Gallery = ({gallery}) => {
    const {title, description, items} = gallery;
    const {width} = useWindowDimensions();

    return <View style={styles.galleryContainer}>
        {gallery.title ? <Text style={styles.galleryTitle}>{title}</Text> : null}
        <CustomRenderHTML source={{html: description}} contentWidth={width} />

        {JSON.stringify(items)}
    </View>;
};

export default Gallery;
