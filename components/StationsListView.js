import React, {useCallback} from "react";
import {SafeAreaView, SectionList} from "react-native";

import StationsListItem from "./StationsListItem";
import StationsListSectionHeader from "./StationsListSectionHeader";

import stationData from "../data/stations.json";


const StationsListView = ({navigation}) => {
    // TODO: Tablet view

    const onPress = useCallback(async id => {
        // noinspection JSCheckFunctionSignatures
        await navigation.navigate("Points of Interest", {screen: `screen.station-list.station.${id}`});
    }, [navigation]);

    return <SafeAreaView style={{flex: 1}}>
        <SectionList
            sections={stationData}
            keyExtractor={(item, index) => `${item.title}.${index}`}
            renderItem={({item, section}) => {
                 return <StationsListItem {...item}
                                          trail={section.id}
                                          onPress={() => onPress(item.id)} />;
             }}
            renderSectionHeader={({section: {title}}) => <StationsListSectionHeader title={title} />} />
    </SafeAreaView>;
}

export default StationsListView;
