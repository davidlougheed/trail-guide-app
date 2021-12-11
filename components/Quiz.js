import React, {useState} from "react";
import {
    Platform,
    StyleSheet,

    Button,
    Text,
    View,

    useWindowDimensions,
} from "react-native";

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

    buttonContainerChooseOne: {
        marginTop: 4,
        marginBottom: 4,
        flexDirection: "row",
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

const Quiz = ({quiz}) => {
    const {quiz_type, title, question, answer, options} = quiz ?? {};
    const {width} = useWindowDimensions();

    const [showAnswer, setShowAnswer] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState(
        quiz_type === "match_values" ? [...new Array(options.length)] : [],
    );
    const [correct, setCorrect] = useState(false);

    const getIcon = optionCorrect => {
        const iconPrefix = Platform.OS === "android" ? "md" : "ios";
        return optionCorrect
            ? <Ionicons name={`${iconPrefix}-checkmark-circle-outline`} size={28} color="#52c41a" />
            : <Ionicons name={`${iconPrefix}-close-circle-outline`} size={28} color="#ff4d4f" />;
    };

    // TODO: title styles
    return <View style={styles.quizContainer}>
        {quiz.title ? <Text style={styles.quizTitle}>{title}</Text> : null}
        <Text style={styles.questionTitle}>Question</Text>
        <CustomRenderHTML source={{html: question}} contentWidth={width} />

        <View style={styles.quizForm}>
            {quiz_type === "match_values" ? <>
                <Button title="Submit" onPress={() => {
                    setCorrect(options.reduce((acc, o, i) => acc && o.answer === selectedOptions[i], true));
                    setShowAnswer(true);
                }} />
            </> : null}

            {quiz_type === "select_all_that_apply" ? <>
                <Button title="Submit" onPress={() => {
                    setCorrect(options.reduce(
                        (acc, o, i) => acc && (o.answer === selectedOptions.includes(i)), true));
                    setShowAnswer(true);
                }} />
            </> : null}

            {quiz_type === "choose_one" ? <>
                {options.map((o, i) => <View key={i} style={styles.buttonContainerChooseOne}>
                    <View style={{paddingRight: showAnswer ? 8 : 0}}>
                        {showAnswer ? getIcon(o.answer) : null}
                    </View>
                    <View style={{flex: 1}}>
                        <Button
                            style={{marginTop: 8, flex: 1}}
                            disabled={selectedOptions[0] !== undefined && selectedOptions[0] !== i}
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
            <CustomRenderHTML source={{html: answer}} contentWidth={width} />
        </View> : null}
    </View>;
};

export default Quiz;
