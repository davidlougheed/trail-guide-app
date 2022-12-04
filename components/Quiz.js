// A mobile app to display interactive trail guide content.
// Copyright (C) 2021-2022  David Lougheed
// See NOTICE for more information.

import React, {useCallback, useMemo, useState} from "react";
import {
    Platform,
    StyleSheet,

    Button,
    Text,
    View,

    useWindowDimensions, TouchableOpacity, Modal,
} from "react-native";

import Checkbox from "expo-checkbox";

import CustomRenderHTML from "./htmlDisplay/CustomRenderHTML";
import {Ionicons} from "@expo/vector-icons";
import QuizButton from "./QuizButton";
import {Picker} from "@react-native-picker/picker";

const styles = StyleSheet.create({
    quizContainer: {
        marginTop: 2,  // Leave a gap to show a little divider line
        padding: 16,
        backgroundColor: "white",
    },

    quizTitle: {
        fontSize: 20,
        marginBottom: 12,
    },

    questionTitle: {
        fontWeight: "bold",
        fontSize: 16,
        textTransform: "uppercase",
    },

    quizForm: {
        paddingTop: 16,
        paddingBottom: 16,

        borderTopColor: "#DDD",
        borderTopWidth: 1,
    },

    optionContainer: {
        minHeight: 36,
        marginTop: 6,
        marginBottom: 6,
        flexDirection: "row",
        alignItems: "center",
    },
    submitButtonContainer: {
        marginTop: 8,
    },

    pickerModal: {
        justifyContent: "flex-end",
        // margin: 0,
        margin: 16,
        marginBottom: 66,
        flex: 1,
    },
    pickerModalContent: {
        backgroundColor: "white",
        borderStyle: "solid",
        borderColor: "#E9E9E9",
        borderWidth: 1,

        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.07,
        shadowRadius: 5,

        padding: 16,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 6,

        gap: 16,
    },
    pickerContainer: {paddingRight: 8, width: 150},
    matchLabel: {fontSize: 16},

    answerContainer: {
        paddingTop: 16,

        borderTopColor: "#DDD",
        borderTopWidth: 1,
    },

    textCorrect: {
        fontWeight: "bold",
        color: "#52c41a",
        marginBottom: 8,
    },
    textIncorrect: {
        fontWeight: "bold",
        color: "#ff4d4f",
        marginBottom: 8,
    },

    flex1: {flex: 1},
});

const getInitialSelectedOptions = ({quiz_type, options}) => {
    switch (quiz_type) {
        case "match_values":
            return [...new Array(options.length)].map(() => "");
        case "select_all_that_apply":
            return [...new Array(options.length)].map(() => false);
        case "choose_one":
            return [false];
        default:
            return [];
    }
};

const getIcon = optionCorrect => {
    const iconPrefix = Platform.OS === "android" ? "md" : "ios";
    return optionCorrect
        ? <Ionicons name={`${iconPrefix}-checkmark-circle-outline`} size={28} color="#52c41a" />
        : <Ionicons name={`${iconPrefix}-close-circle-outline`} size={28} color="#ff4d4f" />;
};

const pickerButtonStyles = StyleSheet.create({
    button: {
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        paddingHorizontal: 16,
    },
    buttonPlaceholder: {
        lineHeight: 24,
        color: "#999999",
        fontSize: 12,
        textAlign: "center",
    },
    buttonValue: {
        lineHeight: 24,
        color: "#999999",
        fontSize: 12,
        textAlign: "center",
    },
});

const PickerButton = React.memo(({placeholder, value, ...props}) => (
    <TouchableOpacity {...props}>
        <View style={pickerButtonStyles.button}>
            {value
                ? <Text style={pickerButtonStyles.buttonValue}>{value} &or;</Text>
                : <Text style={pickerButtonStyles.buttonPlaceholder}>{placeholder} &or;</Text>}
        </View>
    </TouchableOpacity>
));

/**
 *
 * @param {{quiz_type: string, title: string, question: string, answer: string, options: array}} quiz
 * @param setModalsVisible
 * @return {JSX.Element}
 * @constructor
 */
const Quiz = React.memo(({quiz, setModalsVisible}) => {
    const {quiz_type, title, question, answer, options} = quiz ?? {};
    const {width} = useWindowDimensions();

    const answerSource = useMemo(() => ({html: answer}), [answer]);

    const [showAnswer, setShowAnswer] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState(getInitialSelectedOptions(quiz));
    const [correct, setCorrect] = useState(false);

    // Only used for match
    const [visiblePickers, setVisiblePickers] = useState([...new Array(options.length)].map(() => false));
    const [pickerValue, setPickerValue] = useState("");

    const onPickerChange = useCallback(v => setPickerValue(v), []);
    const closeModal = useCallback(() => setVisiblePickers(
        [...new Array(options.length)].map(() => false)), [options]);

    const questionSource = useMemo(() => ({html: question}), [question]);

    // Used for matching quizzes
    const allOptionAnswers = useMemo(() => options
        .map(o => ({value: o.answer.toString(), label: o.answer.toString()}))
        .sort((o1, o2) => o1.label.localeCompare(o2.label)),
        [options]);

    const chooseOnePress = useCallback((o, i) => {
        setSelectedOptions([i]);
        setCorrect(o.answer);
        setShowAnswer(true);
    }, []);

    const onSubmit = useCallback(() => {
        setCorrect(options.reduce((acc, o, i) => acc && o.answer === selectedOptions[i], true));
        setShowAnswer(true);
    }, [options, selectedOptions]);

    const renderedOptions = useMemo(() => {
        switch (quiz_type) {
            case "match_values": {
                return <>
                    {options.map((o, i) => {
                        const onSave = () => {
                            setSelectedOptions(
                                selectedOptions.map((vOld, j) => i === j ? pickerValue : vOld))
                            closeModal();
                        };
                        // noinspection JSValidateTypes
                        return <View key={i} style={styles.optionContainer}>
                            <Modal transparent={true} visible={visiblePickers[i]}>
                                <View style={styles.pickerModal}>
                                    <View style={styles.pickerModalContent}>
                                        <Text style={{fontSize: 22}}>Choose an option</Text>
                                        <Picker id={`picker-${i}`} style={{width: "100%"}}
                                                selectedValue={pickerValue}
                                                onValueChange={onPickerChange}>
                                            <Picker.Item key="placeholder" value="" label="Choose option…" />
                                            {allOptionAnswers.map((o, oi) =>
                                                <Picker.Item key={`option-${oi}`} {...o} />)}
                                        </Picker>
                                        <Button
                                            title="Save"
                                            disabled={!pickerValue}
                                            onPress={onSave}
                                        />
                                    </View>
                                </View>
                            </Modal>
                            <View style={{
                                paddingRight: showAnswer ? 8 : 0,
                                width: showAnswer ? 50 : 0
                            }}>
                                {showAnswer
                                    ? <Text style={{
                                        lineHeight: 36,
                                        textAlign: "right",
                                        color: selectedOptions[i] === o.answer ? "#52c41a" : "#ff4d4f",
                                    }}>{o.answer}</Text> : null}
                            </View>
                            <View style={styles.pickerContainer}>
                                <PickerButton
                                    placeholder="Choose option…"
                                    value={selectedOptions[i]}
                                    onPress={() => {
                                        setPickerValue(selectedOptions[i]);
                                        setVisiblePickers(visiblePickers.map((_p, pi) => pi === i));
                                    }}
                                />
                            </View>
                            <View style={styles.flex1}>
                                <Text style={styles.matchLabel}>{o.label}</Text>
                            </View>
                        </View>;
                    })}
                    <View style={styles.submitButtonContainer}>
                        <Button title="Submit" onPress={onSubmit} />
                    </View>
                </>;
            }
            case "select_all_that_apply": {
                return <>
                    {options.map((o, i) => {
                        const clickHandler = vNew =>
                            setSelectedOptions(selectedOptions.map((vOld, j) => i === j ? vNew : vOld));

                        return <View key={i} style={styles.optionContainer}>
                            <View style={{paddingRight: showAnswer ? 8 : 0, paddingTop: 2}}>
                                {showAnswer ? getIcon(o.answer) : null}
                            </View>
                            <View style={{paddingRight: 8}}>
                                <Checkbox value={selectedOptions[i]} onValueChange={clickHandler} />
                            </View>
                            <View style={styles.flex1}>
                                <Text
                                    onPress={() => clickHandler(!selectedOptions[i])}
                                    style={{fontSize: 18}}
                                >{o.label}</Text>
                            </View>
                        </View>;
                    })}
                    <View style={styles.submitButtonContainer}>
                        <Button title="Submit" onPress={onSubmit} />
                    </View>
                </>;
            }
            case "choose_one": {
                return <>
                    {options.map((o, i) => <View key={i} style={styles.optionContainer}>
                        <View style={{paddingRight: showAnswer ? 8 : 0, paddingTop: 2}}>
                            {showAnswer ? getIcon(o.answer) : null}
                        </View>
                        <View style={styles.flex1}>
                            <QuizButton
                                option={o}
                                index={i}
                                quizSubmitted={showAnswer}
                                selected={selectedOptions[0] === i}
                                onPress={chooseOnePress}
                            />
                        </View>
                    </View>)}
                </>;
            }
            default:
                return null;
        }
    }, [quiz_type, showAnswer, selectedOptions, onSubmit, chooseOnePress, visiblePickers, pickerValue]);

    // noinspection JSValidateTypes
    return <View style={styles.quizContainer}>
        {quiz.title ? <Text style={styles.quizTitle}>{title}</Text> : null}
        <Text style={styles.questionTitle}>Question</Text>
        <CustomRenderHTML
            source={questionSource}
            contentWidth={width}
            setModalsVisible={setModalsVisible}
        />

        <View style={styles.quizForm}>{renderedOptions}</View>

        {showAnswer ? <View style={styles.answerContainer}>
            <Text style={correct ? styles.textCorrect : styles.textIncorrect}>
                {correct ? "Correct!" : "Sorry, not quite right."}</Text>
            <Text style={styles.questionTitle}>Answer</Text>
            <CustomRenderHTML source={answerSource} contentWidth={width} setModalsVisible={setModalsVisible} />
        </View> : null}
    </View>;
});

export default Quiz;
