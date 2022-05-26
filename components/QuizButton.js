// noinspection JSValidateTypes

import React from "react";
import {Platform, PlatformColor, StyleSheet, TouchableOpacity, View} from "react-native";
import RenderHTML from "react-native-render-html";

const pc = PlatformColor ?? (() => undefined);

// noinspection JSCheckFunctionSignatures
const styles = StyleSheet.create({
    buttonView: {
        borderRadius: 2,
        padding: 8,
        flex: 1,
        borderBottomColor: "rgba(0, 0, 0, 0.1)",
        borderBottomWidth: 2,
    },
    buttonViewActive: Platform.select({
        ios: {backgroundColor: pc("systemBlue")},
        android: {backgroundColor: pc("@android:color/holo_blue_dark")},
        default: {backgroundColor: "rgb(0, 122, 255)"},
    }),
    buttonViewDisabled: {
        opacity: 0.4,
        ...Platform.select({
            ios: {backgroundColor: pc("systemGray2")},
            android: {backgroundColor: pc("@android:color/darker_gray")},
            default: {backgroundColor: "rgb(174, 174, 178)"},
        }),
    },
    buttonViewIncorrect: Platform.select({
        ios: {backgroundColor: pc("systemRed")},
        android: {backgroundColor: pc("@android:color/holo_red_dark")},
        default: {backgroundColor: "rgb(255, 59, 48)"},
    }),
    buttonViewCorrect: Platform.select({
        ios: {backgroundColor: pc("systemRed")},
        android: {backgroundColor: pc("@android:color/holo_red_dark")},
        default: {backgroundColor: "rgb(52, 199, 89)"},
    }),
});

const QuizButton = ({selected, correct, quizSubmitted, label, onPress}) => {
    // noinspection JSValidateTypes
    return <TouchableOpacity style={{flex: 1, marginTop: 4, marginBottom: 4}} onPress={onPress}>
        <View style={StyleSheet.compose(
            styles.buttonView, quizSubmitted 
                ? (selected ? (
                    correct 
                        ? styles.buttonViewCorrect
                        : styles.buttonViewIncorrect
                ) : styles.buttonViewDisabled) 
                : styles.buttonViewActive
        )}>
            <RenderHTML source={{html: label}} 
                        baseStyle={{
                            color: (quizSubmitted && !selected ? "#666666" : "white"), 
                            textTransform: "uppercase", 
                            textAlign: "center",
                            fontWeight: "bold",
                        }} />
        </View>
    </TouchableOpacity>;
};

export default QuizButton;
