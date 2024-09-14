// A mobile app to display interactive trail guide content.
// Copyright (C) 2021-2024  David Lougheed
// See NOTICE for more information.

import { memo, useCallback, useMemo, useState } from "react";
import {TouchableOpacity} from "react-native";

import Constants from "expo-constants";
import {Ionicons} from "@expo/vector-icons";

import {createNativeStackNavigator} from "@react-navigation/native-stack";

// import {linkColor} from "../constants";
import {localDataProvider} from "../dataSources";
import {STATION_LIST, PRIVACY_POLICY, stationScreenName} from "../routes";

import StationsDetailView from "./StationsDetailView";
import StationsListView from "./StationsListView";

import AppInfoModal from "./AppInfoModal";
import PrivacyPolicy from "./PrivacyPolicy";

const Stack = createNativeStackNavigator();

const STATION_SCREENS = localDataProvider.stations.enabled
    .map(s =>
        <Stack.Screen
            key={s.id}
            name={stationScreenName(s.id)}
            options={{title: s.title}}
        >{props => <StationsDetailView {...props} station={s} />}</Stack.Screen>
    );

const navigatorScreenOptions = {
    headerBackTitle: "Back",
};
const privacyPolicyScreenOptions = {
    title: "Privacy Policy",
};

const StationsView = memo(() => {
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
        <Stack.Navigator initialRouteName={STATION_LIST} screenOptions={navigatorScreenOptions}>
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
