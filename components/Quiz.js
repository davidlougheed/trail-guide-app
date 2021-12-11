import React, {useState} from "react";
import {
    Button,
    Text,
    View,

    useWindowDimensions,
} from "react-native";

import CustomRenderHTML from "./htmlDisplay/CustomRenderHTML";

const Quiz = ({quiz}) => {
    const {quiz_type, title, question, answer, options} = quiz ?? {};
    const {width} = useWindowDimensions();

    const [showAnswer, setShowAnswer] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState(
        quiz_type === "match_values" ? [...new Array(options.length)] : [],
    );
    const [correct, setCorrect] = useState(false);

    // TODO: title styles
    return <View>
        {quiz.title ? <Text>{title}</Text> : null}
        <Text>Question</Text>
        <CustomRenderHTML source={{html: question}} contentWidth={width} />

        {quiz_type}

        TODO: Render options
        {quiz_type === "match_values" ? <View>
            <Button title="Submit" onPress={() => {
                setCorrect(options.reduce((acc, o, i) => acc && o.answer === selectedOptions[i], true));
                setShowAnswer(true);
            }} />
        </View> : null}

        {quiz_type === "select_all_that_apply" ? <View>
            <Button title="Submit" onPress={() => {
                setCorrect(options.reduce((acc, o, i) => acc && (o.answer === selectedOptions.includes(i)), true));
                setShowAnswer(true);
            }} />
        </View> : null}

        {quiz_type === "choose_one" ? <View>
            {options.map((o, i) =>
                <Button
                    title={o.label}
                    key={i}
                    type={selectedOptions[0] === i ? "primary" : "default"}
                    danger={showAnswer && !o.answer}
                    onPress={() => {
                        setSelectedOptions([i]);
                        setCorrect(o.answer);
                        setShowAnswer(true);
                    }} />)}
        </View> : null}

        {showAnswer ? <View>
            <Text>Answer</Text>
            <CustomRenderHTML source={{html: answer}} contentWidth={width} />
        </View> : null}
    </View>;
};

export default Quiz;
