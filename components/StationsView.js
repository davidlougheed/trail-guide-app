import React, {useMemo, useState} from "react";
import {TouchableOpacity} from "react-native";

import Constants from "expo-constants";
import {Ionicons} from "@expo/vector-icons";

import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {linkColor} from "../constants";

import StationsDetailView from "./StationsDetailView";
import StationsListView from "./StationsListView";

import stationData from "../data/stations.json";
import AppInfoModal from "./AppInfoModal";

const Stack = createNativeStackNavigator();

const StationsView = () => {
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
                    color={linkColor}
                />
            </TouchableOpacity>
        ),
    }), []);

    // TODO: Don't use callback method for stack component, since it's slow

    return <>
        <AppInfoModal visible={showInfoModal} onRequestClose={() => setShowInfoModal(false)} />
        <Stack.Navigator initialRouteName="screen.station-list.list">
            <Stack.Screen
                name="screen.station-list.list"
                options={listViewScreenOptions}
                component={StationsListView}
            />
            {stationData
                .flatMap(t => t.data)
                .map(s => {
                    return <Stack.Screen key={s.title} name={`screen.station-list.station.${s.id}`} options={{
                        title: s.title,
                    }}>{props => <StationsDetailView {...props} station={s} />}</Stack.Screen>;
                })}
        </Stack.Navigator>
    </>;
}

export default StationsView;
