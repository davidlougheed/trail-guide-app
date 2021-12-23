import React from "react";
import {StyleSheet, View} from "react-native";

const WebPagerView = ({children, style, ...props}) => {
    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            overflow: "scroll",
        },
    });

    return <View {...props} style={[style, styles.container]}>
        {children}
    </View>;
};

export default WebPagerView;
