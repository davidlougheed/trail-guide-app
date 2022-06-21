import React, {useMemo, useState} from "react";
import {TouchableOpacity} from "react-native";

import Constants from "expo-constants";
import {Ionicons} from "@expo/vector-icons";

import {createNativeStackNavigator} from "@react-navigation/native-stack";

// import {linkColor} from "../constants";
import {STATION_LIST, stationScreenName} from "../routes";

import StationsDetailView from "./StationsDetailView";
import StationsListView from "./StationsListView";

import stationData from "../data/stations.json";
import AppInfoModal from "./AppInfoModal";

const Stack = createNativeStackNavigator();

const STATION_SCREENS = stationData
    .flatMap(t => t.data)
    .map(s =>
        <Stack.Screen
            key={s.id}
            name={stationScreenName(s.id)}
            options={{title: s.title}}
        >{props => <StationsDetailView {...props} station={s} />}</Stack.Screen>
    );

const StationsView = React.memo(() => {
    // TODO: Tablet view

    const [showInfoModal, setShowInfoModal] = useState(false);

    const listViewScreenOptions = useMemo(() => ({
        gestureEnabled: false,
        title: Constants.manifest.name,
        headerRight: () => (
            <TouchableOpacity onPress={() => setShowInfoModal(true)}>
                <Ionicons
                    name="information-circle-outline"
                    size={24}
                    // color={linkColor}
                />
            </TouchableOpacity>
        ),
    }), []);

    // TODO: Don't use callback method for stack component, since it's slow

    // noinspection JSValidateTypes
    return <>
        <AppInfoModal visible={showInfoModal} onRequestClose={() => setShowInfoModal(false)} />
        <Stack.Navigator initialRouteName={STATION_LIST}>
            <Stack.Screen
                name={STATION_LIST}
                options={listViewScreenOptions}
                component={StationsListView}
            />
            {STATION_SCREENS}
        </Stack.Navigator>
    </>;
});

export default StationsView;
