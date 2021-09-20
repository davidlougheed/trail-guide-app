import React from  "react";
import {View} from "react-native";

import {createNativeStackNavigator} from "@react-navigation/native-stack";

import StationsDetailView from "./StationsDetailView";
import StationsListView from "./StationsListView";

import stationData from "../data/stations.example.json";

const Stack = createNativeStackNavigator();

const StationsView = () => {
    // TODO: Tablet view

    // TODO: Don't use callback method for stack component, since it's slow

    return <Stack.Navigator initialRouteName="screen.station-list">
        <Stack.Screen name="screen.station-list" options={{
            gestureEnabled: false,
            title: "Elbow Lake Trail Guide",
        }} component={StationsListView} />
        {stationData
            .flatMap(t => t.data)
            .map(s => {
                return <Stack.Screen key={s.title} name={`screen.station.${s.title}`} options={{
                    title: s.title,
                }}>{props => <StationsDetailView {...props} {...s} />}</Stack.Screen>;
            })}
    </Stack.Navigator>;
}

export default StationsView;
