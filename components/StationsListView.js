import React from  "react";
import {SafeAreaView, SectionList, Text} from "react-native";

import StationsListItem from "./StationsListItem";

import stationData from "../data/stations.example.json";


const StationsListView = ({navigation}) => {
    // TODO: Tablet view

    const onPress = async index => {
        // noinspection JSCheckFunctionSignatures
        await navigation.navigate("Points of Interest", {screen: `screen.station.${index}`});
    };

    return (
        <SafeAreaView>
            <SectionList sections={stationData}
                         renderItem={({item, index}) =>
                             <StationsListItem {...item} onPress={() => onPress(index)} />}
                         renderSectionHeader={({section: {title}}) => <Text>{title}</Text>} />
        </SafeAreaView>
    );
}

export default StationsListView;
