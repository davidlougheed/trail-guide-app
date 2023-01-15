// A mobile app to display interactive trail guide content.
// Copyright (C) 2021-2023  David Lougheed
// See NOTICE for more information.

import React, {useCallback, useMemo, useState} from "react";
import {TouchableOpacity} from "react-native";

import Constants from "expo-constants";
import {Ionicons} from "@expo/vector-icons";

import {createNativeStackNavigator} from "@react-navigation/native-stack";

// import {linkColor} from "../constants";
import {enabledStations} from "../dataSources";
import {STATION_LIST, PRIVACY_POLICY, stationScreenName} from "../routes";

import StationsDetailView from "./StationsDetailView";
import StationsListView from "./StationsListView";

import AppInfoModal from "./AppInfoModal";
import PrivacyPolicy from "./PrivacyPolicy";

const Stack = createNativeStackNavigator();

const STATION_SCREENS = enabledStations
    .map(s =>
        <Stack.Screen
            key={s.id}
            name={stationScreenName(s.id)}
            options={{title: s.title}}
        >{props => <StationsDetailView {...props} station={s} />}</Stack.Screen>
    );

const privacyPolicyScreenOptions = {
    title: "Privacy Policy",
};

const StationsView = React.memo(() => {
    // TODO: Tablet view

    const [showInfoModal, setShowInfoModal] = useState(false);

    const listViewScreenOptions = useMemo(() => ({
        gestureEnabled: false,
        title: Constants.expoConfig.name,
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

    const onRequestClose = useCallback(() => setShowInfoModal(false), []);

    // noinspection JSValidateTypes
    return <>
        <AppInfoModal visible={showInfoModal} onRequestClose={onRequestClose} />
        <Stack.Navigator initialRouteName={STATION_LIST}>
            <Stack.Screen
                name={STATION_LIST}
                options={listViewScreenOptions}
                component={StationsListView}
            />
            <Stack.Screen
                name={PRIVACY_POLICY}
                options={privacyPolicyScreenOptions}
                component={PrivacyPolicy}
            />
            {STATION_SCREENS}
        </Stack.Navigator>
    </>;
});

export default StationsView;
