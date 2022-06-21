// A web interface to manage a trail guide mobile app's content and data.
// Copyright (C) 2021  David Lougheed
// See NOTICE for more information.

import React, {useCallback, useEffect, useState} from "react";
import {Platform} from "react-native";

import * as Linking from "expo-linking";
import {Ionicons} from "@expo/vector-icons";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import AsyncStorage from "@react-native-async-storage/async-storage";

import PageView from "./components/PageView";
import MapView from "./components/MapView";
import StationsView from "./components/StationsView";

const POINTS_OF_INTEREST = "Points of Interest";
const MAP = "Map";

import modalData from "./data/modals.json";
import pageData from "./data/pages.json"
import settings from "./data/settings.json";
import stationData from "./data/stations.json";
import CustomModal from "./components/CustomModal";
import {MAP_OVERVIEW, mapStationScreenName, STATION_LIST, stationScreenName} from "./routes";

const pagesById = Object.fromEntries(pageData.map(page => [page.id, page]));

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
            default:
                // Page
                iconName = `${iconPrefix}-${pagesById[route.name].icon ?? "help-circle-outline"}`;
                break;
        }

        return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: "#0f746f",
    tabBarInactiveTintColor: "gray",
});

const urlPrefix = Linking.createURL("/");
const linking = {
    prefixes: [urlPrefix],
    config: {
        screens: {
            [POINTS_OF_INTEREST]: {
                initialRouteName: STATION_LIST,
                screens: {
                    [STATION_LIST]: "stations/list",
                    ...Object.fromEntries(stationData
                        .flatMap(t => t.data)
                        .map(s => [stationScreenName(s.id), `stations/detail/${s.id}`])
                    ),
                },
            },
            [MAP]: {
                initialRouteName: MAP_OVERVIEW,
                screens: {
                    [MAP_OVERVIEW]: "map/overview",
                    ...Object.fromEntries(stationData
                        .flatMap(t => t.data)
                        .map(s => [mapStationScreenName(s.id), `map/detail/${s.id}`])
                    ),
                },
            },
            ...Object.fromEntries(pageData.map(page => [page.id, `pages/${page.id}`])),
        }
    },
};

const KEY_TERMS_SEEN = "@termsSeen";

const SCREEN_OPTIONS = {
    [POINTS_OF_INTEREST]: {headerShown: false},
    [MAP]: {headerShown: false},
};

const PAGE_SCREENS = pageData.map(page =>
    <Tab.Screen
        key={page.id}
        name={page.id}
        component={PageView}
        options={{title: page.title}}
        initialParams={{pageId: page.id}}
    />
);

const App = React.memo(() => {
    const termsModal = settings?.terms_modal ?? null;

    const [termsModalVisible, setTermsModalVisible] = useState(false);

    useEffect(() => {
        const fn = async () => {
            try {
                const termsSeen = await AsyncStorage.getItem(KEY_TERMS_SEEN);
                if (termsModal && termsSeen === null) {
                    // There is a terms modal to show, and we haven't seen it yet, so set it to visible
                    setTermsModalVisible(true);
                }
            } catch (e) {
                console.error(e);
            }
        };
        fn().catch(console.error);
    }, []);

    const handleCloseModal = useCallback(async () => {
        try {
            await AsyncStorage.setItem(KEY_TERMS_SEEN, "true");  // Some non-null value, doesn't really matter
        } catch (e) {
            console.error(e);
        } finally {
            setTermsModalVisible(false);
        }
    }, []);

    return <NavigationContainer linking={linking}>
        <CustomModal
            visible={termsModalVisible}
            data={modalData[termsModal] ?? {}}
            onRequestClose={handleCloseModal}
        />
        <Tab.Navigator screenOptions={getScreenOptions} initialRouteName={POINTS_OF_INTEREST}>
            <Tab.Screen
                name={POINTS_OF_INTEREST}
                options={SCREEN_OPTIONS[POINTS_OF_INTEREST]}
                component={StationsView}
            />
            <Tab.Screen
                name={MAP}
                options={SCREEN_OPTIONS[MAP]}
                component={MapView}
            />
            {PAGE_SCREENS}
        </Tab.Navigator>
    </NavigationContainer>;
});

// noinspection JSUnusedGlobalSymbols
export default App;
