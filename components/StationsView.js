import React from  "react";
import {View} from "react-native";

import {createNativeStackNavigator} from "@react-navigation/native-stack";

import StationsListView from "./StationsListView";

import stationData from "../data/stations.example.json";

const Stack = createNativeStackNavigator();

const StationsView = () => {
    // TODO: Tablet view

    return (
        <Stack.Navigator initialRouteName="screen.station-list">
            <Stack.Screen name="screen.station-list" options={{
                gestureEnabled: false,
                title: "Points of Interest",
            }} component={StationsListView} />
            {stationData
                .flatMap(t => t.data)
                .map((s, i) =>
                    <Stack.Screen key={s.shortTitle} name={`screen.station.${i}`} options={{
                        title: s.shortTitle,
                    }} component={View} />)}
        </Stack.Navigator>
    );
}

export default StationsView;
