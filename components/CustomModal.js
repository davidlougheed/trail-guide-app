// A mobile app to display interactive trail guide content.
// Copyright (C) 2021-2022  David Lougheed
// See NOTICE for more information.

import React from "react";
import {Button, Modal, Text, useWindowDimensions, ScrollView, View, SafeAreaView} from "react-native";

import CustomRenderHTML from "./htmlDisplay/CustomRenderHTML";

const modalStyles = {
    safeArea: {
        flex: 1,
    },
    container: {
        paddingLeft: 24,
        paddingRight: 24,
        marginTop: 4,
        marginBottom: 16,
    },
    htmlBase: {padding: 0},
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
    },
    buttonContainer: {
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 16,
        paddingBottom: 16,
        marginLeft: 8,
        marginRight: 8,
        borderTopWidth: 1,
        borderTopColor: "rgb(229, 229, 234)",
    },
};

const CustomModal = React.memo(({visible, data, onRequestClose}) => {
    const {width} = useWindowDimensions();

    const {title, content, close_text} = data;

    return <Modal animationType="slide" transparent={false} visible={visible} onRequestClose={onRequestClose}>
        <SafeAreaView style={modalStyles.safeArea}>
            <ScrollView style={modalStyles.container}>
                {title ? <Text style={modalStyles.title}>{title}</Text> : null}
                <CustomRenderHTML
                    source={{html: content ?? ""}}
                    baseStyle={modalStyles.htmlBase}
                    contentWidth={width}
                    onNavigateAway={onRequestClose}
                />
            </ScrollView>
            <View style={modalStyles.buttonContainer}>
                <Button onPress={onRequestClose} title={(close_text ?? "Close").toLocaleUpperCase()} />
            </View>
        </SafeAreaView>
    </Modal>;
});

export default CustomModal;
