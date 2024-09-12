// A mobile app to display interactive trail guide content.
// Copyright (C) 2021-2023  David Lougheed
// See NOTICE for more information.

import { memo } from "react";
import {SafeAreaView, SectionList, StyleSheet} from "react-native";

import StationsListItem from "./StationsListItem";
import StationsListSectionHeader from "./StationsListSectionHeader";

import {localDataProvider} from "../dataSources";
import {stationScreenName} from "../routes";

const styles = StyleSheet.create({
    safeView: {flex: 1},
});


const StationsListView = memo(({navigation}) => {
    // TODO: Tablet view

    const onPress = id => navigation.navigate("Points of Interest", {screen: stationScreenName(id)});

    return <SafeAreaView style={styles.safeView}>
        <SectionList
            sections={localDataProvider.stations.categoryNested}
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
