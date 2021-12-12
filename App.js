// A web interface to manage a trail guide mobile app's content and data.
// Copyright (C) 2021  David Lougheed
// See NOTICE for more information.

import React from "react";
import {Platform} from "react-native";

import {Ionicons} from "@expo/vector-icons";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import AboutView from "./components/AboutView";
import MapView from "./components/MapView";
import StationsView from "./components/StationsView";

const POINTS_OF_INTEREST = "Points of Interest";
const MAP = "Map";
const ABOUT = "About";

import stationData from "./data/stations.example.json";

const Tab = createBottomTabNavigator();

// noinspection JSUnusedGlobalSymbols
const getScreenOptions = ({route}) => ({
    tabBarIcon: ({color, size}) => {
        let iconName;

        const iconPrefix = Platform.OS === "android" ? "md" : "ios";

        switch (route.name) {
            case POINTS_OF_INTEREST:
                iconName = `${iconPrefix}-information-circle-outline`;
                break;
            case MAP:
                iconName = `${iconPrefix}-map-outline`;
                break;
            case ABOUT:
                iconName = `${iconPrefix}-help-circle-outline`;
                break;
            default:
                iconName = `${iconPrefix}-help-outline`;
                break;
        }

        return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: "#0f746f",
    tabBarInactiveTintColor: "gray",
});

const LINKING = {
    prefixes: ["http://localhost:19006"],
    config: {
        screens: {
            [POINTS_OF_INTEREST]: {
                screens: {
                    "screen.station-list": "stations/list",
                    ...Object.fromEntries(stationData
                        .flatMap(t => t.data)
                        .map(s => [`screen.station.${s.title}`, `stations/detail/${s.title}`])
                    ),
                },
            },
            [MAP]: "map",
            [ABOUT]: "about",
        }
    },
};

const App = () => (
    <NavigationContainer linking={LINKING}>
        <Tab.Navigator screenOptions={getScreenOptions}>
            <Tab.Screen name={POINTS_OF_INTEREST} options={{headerShown: false}} component={StationsView} />
            <Tab.Screen name={MAP} component={MapView} />
            <Tab.Screen name={ABOUT} component={AboutView} />
        </Tab.Navigator>
    </NavigationContainer>
);

// noinspection JSUnusedGlobalSymbols
export default App;
