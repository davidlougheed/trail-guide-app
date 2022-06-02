import React from "react";
import {StyleSheet, View} from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        overflow: "scroll",
    },
});

const WebPagerView = React.memo(({children, style, ...props}) => (
    <View {...props} style={[style, styles.container]}>
        {children}
    </View>
));

export default WebPagerView;
