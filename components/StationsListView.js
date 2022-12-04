// A mobile app to display interactive trail guide content.
// Copyright (C) 2021-2022  David Lougheed
// See NOTICE for more information.

import React, {useCallback} from "react";
import {SafeAreaView, SectionList, StyleSheet} from "react-native";

import StationsListItem from "./StationsListItem";
import StationsListSectionHeader from "./StationsListSectionHeader";

import {stationData} from "../dataSources";

const styles = StyleSheet.create({
    safeView: {flex: 1},
});


const StationsListView = React.memo(({navigation}) => {
    // TODO: Tablet view

    const onPress = useCallback(
        id => navigation.navigate("Points of Interest", {screen: `screen.station-list.station.${id}`}),
        [navigation]);

    return <SafeAreaView style={styles.safeView}>
        <SectionList
            sections={stationData}
            keyExtractor={(item, index) => `${item.title}.${index}`}
            renderItem={({item, section}) => (
                 <StationsListItem
                     {...item}
                     trail={section.id}
                     onPress={() => onPress(item.id)}
                 />
            )}
            renderSectionHeader={({section: {title}}) => <StationsListSectionHeader title={title} />} />
    </SafeAreaView>;
});

export default StationsListView;
