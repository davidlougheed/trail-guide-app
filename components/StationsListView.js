// A mobile app to display interactive trail guide content.
// Copyright (C) 2021-2026  David Lougheed
// See NOTICE for more information.

import { memo } from "react";
import { SectionList, StyleSheet, View } from "react-native";

import StationsListItem from "./StationsListItem";
import StationsListSectionHeader from "./StationsListSectionHeader";

import { localDataProvider } from "../dataSources";
import { stationScreenName } from "../routes";

const styles = StyleSheet.create({
    view: { flex: 1 },
});


const StationsListView = memo(({navigation}) => {
    // TODO: Tablet view

    const onPress = id => navigation.navigate("Points of Interest", {screen: stationScreenName(id)});

    return <View style={styles.view}>
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
    </View>;
});

export default StationsListView;
