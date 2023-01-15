// A mobile app to display interactive trail guide content.
// Copyright (C) 2021-2023  David Lougheed
// See NOTICE for more information.
// noinspection JSValidateTypes

import React, {useCallback} from "react";
import {Platform, PlatformColor, StyleSheet, TouchableOpacity, useWindowDimensions, View} from "react-native";
import RenderHTML from "react-native-render-html";

const pc = PlatformColor ?? (() => undefined);

// noinspection JSCheckFunctionSignatures
const styles = StyleSheet.create({
    buttonOpacity: {
        flex: 1,
        marginTop: 4,
        marginBottom: 4,
    },
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
        ios: {backgroundColor: pc("systemGreen")},
        android: {backgroundColor: pc("@android:color/holo_green_dark")},
        default: {backgroundColor: "rgb(52, 199, 89)"},
    }),
});

const QuizButton = React.memo(({option, index, selected, quizSubmitted, onPress}) => {
    const {width} = useWindowDimensions();

    const onPress_ = useCallback(() => {
        onPress(option, index);
    }, [option, index]);

    // We use a RenderHTML element here for button content,
    // since buttons may contain formatting such as italic text
    // (for example, for scientific names of species.)
    // noinspection JSValidateTypes
    return <TouchableOpacity style={styles.buttonOpacity} onPress={onPress_}>
        <View style={StyleSheet.compose(
            styles.buttonView, quizSubmitted 
                ? (selected ? (
                    option.answer
                        ? styles.buttonViewCorrect
                        : styles.buttonViewIncorrect
                ) : styles.buttonViewDisabled) 
                : styles.buttonViewActive
        )}>
            <RenderHTML
                source={{html: option.label}}
                contentWidth={width - 16}
                baseStyle={{
                    color: (quizSubmitted && !selected ? "#666666" : "white"),
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 18,
                }}
            />
        </View>
    </TouchableOpacity>;
});

export default QuizButton;
