import React from "react";
import {Button, Modal, Text, useWindowDimensions, View} from "react-native";

import CustomRenderHTML from "./htmlDisplay/CustomRenderHTML";

const modalStyles = {
    container: {flex: 1, padding: 16},
    htmlBase: {padding: 0},
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
    }
};

const CustomModal = ({visible, data, onRequestClose}) => {
    const {width} = useWindowDimensions();

    const {title, content, close_text} = data;

    return <Modal animationType="slide" transparent={false} visible={visible} onRequestClose={onRequestClose}>
        <View style={modalStyles.container}>
            {title ? <Text style={modalStyles.title}>{title}</Text> : null}
            <CustomRenderHTML
                source={{html: content ?? ""}}
                baseStyle={modalStyles.htmlBase}
                contentWidth={width}
            />
            <Button onPress={onRequestClose} title={(close_text ?? "Close").toLocaleUpperCase()} />
        </View>
    </Modal>;
};

export default CustomModal;
