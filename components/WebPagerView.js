// A mobile app to display interactive trail guide content.
// Copyright (C) 2021-2023  David Lougheed
// See NOTICE for more information.

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
