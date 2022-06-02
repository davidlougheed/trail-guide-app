// A web interface to manage a trail guide mobile app's content and data.
// Copyright (C) 2021  David Lougheed
// See NOTICE for more information.

import React, {useEffect, useState} from "react";
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
                screens: {
                    "screen.station-list.list": "stations/list",
                    ...Object.fromEntries(stationData
                        .flatMap(t => t.data)
                        .map(s => [`screen.station-list.station.${s.id}`, `stations/detail/${s.id}`])
                    ),
                },
            },
            [MAP]: {
                screens: {
                    "screen.map.overview": "map/overview",
                    ...Object.fromEntries(stationData
                        .flatMap(t => t.data)
                        .map(s => [`screen.map.station.${s.id}`, `map/detail/${s.id}`])
                    ),
                },
            },
            ...Object.fromEntries(pageData.map(page => [page.id, `pages/${page.id}`])),
        }
    },
};

const KEY_TERMS_SEEN = "@termsSeen";

const App = () => {
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

    const handleCloseModal = async () => {
        try {
            await AsyncStorage.setItem(KEY_TERMS_SEEN, "true");  // Some non-null value, doesn't really matter
        } catch (e) {
            console.error(e);
        } finally {
            setTermsModalVisible(false);
        }
    };

    return <>
        <CustomModal
            visible={termsModalVisible}
            data={modalData[termsModal] ?? {}}
            onRequestClose={handleCloseModal}
        />
        <NavigationContainer linking={linking}>
            <Tab.Navigator screenOptions={getScreenOptions}>
                <Tab.Screen name={POINTS_OF_INTEREST} options={{headerShown: false}} component={StationsView} />
                <Tab.Screen name={MAP} component={MapView} options={{headerShown: false}} />
                {pageData.map(page =>
                    <Tab.Screen
                        key={page.id}
                        name={page.id}
                        component={PageView}
                        options={{title: page.title}}
                        initialParams={{pageId: page.id}}
                    />
                )}
            </Tab.Navigator>
        </NavigationContainer>
    </>;
};

// noinspection JSUnusedGlobalSymbols
export default App;
