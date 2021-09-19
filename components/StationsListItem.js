import React from "react";
import {Text, TouchableOpacity, View} from "react-native";

const StationsListItem = ({shortTitle, content, onPress}) => {
    // TODO: Format content for list item
    return (
        <View onPress={() => console.log("pressed")}>
            <TouchableOpacity onPress={onPress}>
                <Text>{shortTitle}</Text>
                <Text>{content}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default StationsListItem;
