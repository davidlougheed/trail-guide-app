import React from  "react";
import {SafeAreaView, SectionList} from "react-native";

import StationsListItem from "./StationsListItem";
import StationsListSectionHeader from "./StationsListSectionHeader";

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
                         keyExtractor={(item, index) => `${item.title}.${index}`}
                         renderItem={({item, index, ...props}) => {
                             return <StationsListItem {...item} trail={"red"} onPress={() => onPress(index)} />;
                         }}
                         renderSectionHeader={({section: {title}}) => <StationsListSectionHeader title={title} />} />
        </SafeAreaView>
    );
}

export default StationsListView;
