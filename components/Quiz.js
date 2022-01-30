import React, {useState} from "react";
import {
    Platform,
    StyleSheet,

    Button,
    Text,
    View,

    useWindowDimensions,
} from "react-native";

import Checkbox from "expo-checkbox";
import RNPickerSelect from "react-native-picker-select";

import CustomRenderHTML from "./htmlDisplay/CustomRenderHTML";
import {Ionicons} from "@expo/vector-icons";

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
        fontSize: 14,
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

/**
 *
 * @param {{quiz_type: string, title: string, question: string, answer: string, options: array}} quiz
 * @param setModalsVisible
 * @return {JSX.Element}
 * @constructor
 */
const Quiz = ({quiz, setModalsVisible}) => {
    const {quiz_type, title, question, answer, options} = quiz ?? {};
    const {width} = useWindowDimensions();

    const [showAnswer, setShowAnswer] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState(getInitialSelectedOptions(quiz));
    const [correct, setCorrect] = useState(false);

    // Used for matching quizzes
    const allOptionAnswers = options.map(o => ({
        value: o.answer.toString(),
        label: o.answer.toString(),
    })).sort((o1, o2) => o1.label.localeCompare(o2.label));

    return <View style={styles.quizContainer}>
        {quiz.title ? <Text style={styles.quizTitle}>{title}</Text> : null}
        <Text style={styles.questionTitle}>Question</Text>
        <CustomRenderHTML
            source={{html: question}}
            contentWidth={width}
            setModalsVisible={setModalsVisible}
        />

        <View style={styles.quizForm}>
            {quiz_type === "match_values" ? <>
                {options.map((o, i) => {
                    return <View key={i} style={styles.optionContainer}>
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
                        <View style={{paddingRight: 8, width: 140}}>
                            <RNPickerSelect
                                placeholder={{
                                    label: "Select an option…",
                                    value: "",
                                }}
                                onValueChange={vNew =>
                                    setSelectedOptions(selectedOptions.map((vOld, j) => i === j ? vNew : vOld))}
                                items={allOptionAnswers}
                            />
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={{fontSize: 16}}>{o.label}</Text>
                        </View>
                    </View>;
                })}
                <View style={styles.submitButtonContainer}>
                    <Button title="Submit" onPress={() => {
                        setCorrect(options.reduce((acc, o, i) => acc && o.answer === selectedOptions[i], true));
                        setShowAnswer(true);
                    }} />
                </View>
            </> : null}

            {quiz_type === "select_all_that_apply" ? <>
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
                        <View style={{flex: 1}}>
                            <Text
                                onPress={() => clickHandler(!selectedOptions[i])}
                                style={{fontSize: 16}}
                            >{o.label}</Text>
                        </View>
                    </View>;
                })}
                <View style={styles.submitButtonContainer}>
                    <Button title="Submit" onPress={() => {
                        setCorrect(options.reduce((acc, o, i) => acc && o.answer === selectedOptions[i], true));
                        setShowAnswer(true);
                    }} />
                </View>
            </> : null}

            {quiz_type === "choose_one" ? <>
                {options.map((o, i) => <View key={i} style={styles.optionContainer}>
                    <View style={{paddingRight: showAnswer ? 8 : 0, paddingTop: 2}}>
                        {showAnswer ? getIcon(o.answer) : null}
                    </View>
                    <View style={{flex: 1}}>
                        <Button
                            style={{marginTop: 8, flex: 1}}
                            disabled={showAnswer && selectedOptions[0] !== i}
                            title={o.label}
                            type={selectedOptions[0] === i ? "primary" : "default"}
                            danger={showAnswer && !o.answer}
                            onPress={() => {
                                setSelectedOptions([i]);
                                setCorrect(o.answer);
                                setShowAnswer(true);
                            }} />
                    </View>
                </View>)}
            </> : null}
        </View>

        {showAnswer ? <View style={styles.answerContainer}>
            <Text style={correct ? styles.textCorrect : styles.textIncorrect}>
                {correct ? "Correct!" : "Sorry, not quite right."}</Text>
            <Text style={styles.questionTitle}>Answer</Text>
            <CustomRenderHTML source={{html: answer}} contentWidth={width} setModalsVisible={setModalsVisible} />
        </View> : null}
    </View>;
};

export default Quiz;
