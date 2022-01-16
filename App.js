// A web interface to manage a trail guide mobile app's content and data.
// Copyright (C) 2021  David Lougheed
// See NOTICE for more information.

import React, {useEffect, useState} from "react";
import {Platform} from "react-native";

import {Ionicons} from "@expo/vector-icons";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import AsyncStorage from "@react-native-async-storage/async-storage";

import AboutView from "./components/AboutView";
import MapView from "./components/MapView";
import StationsView from "./components/StationsView";

const POINTS_OF_INTEREST = "Points of Interest";
const MAP = "Map";
const ABOUT = "About";

import modalData from "./data/modals.json";
import settings from "./data/settings.json";
import stationData from "./data/stations.json";
import CustomModal from "./components/CustomModal";

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
    prefixes: ["http://localhost:19006"],  // TODO: Allow for proper prefix
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

const KEY_TERMS_SEEN = "@termsSeen";

const App = () => {
    const termsModal = settings?.terms_modal ?? null;

    const [termsModalVisible, setTermsModalVisible] = useState(false);

    useEffect(async () => {
        try {
            const termsSeen = await AsyncStorage.getItem(KEY_TERMS_SEEN);
            if (termsModal && termsSeen === null) {
                // There is a terms modal to show, and we haven't seen it yet, so set it to visible
                setTermsModalVisible(true);
            }
        } catch (e) {
            console.error(e);
        }
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
        <NavigationContainer linking={LINKING}>
            <Tab.Navigator screenOptions={getScreenOptions}>
                <Tab.Screen name={POINTS_OF_INTEREST} options={{headerShown: false}} component={StationsView} />
                <Tab.Screen name={MAP} component={MapView} options={{headerShown: false}} />
                <Tab.Screen name={ABOUT} component={AboutView} />
            </Tab.Navigator>
        </NavigationContainer>
    </>;
};

// noinspection JSUnusedGlobalSymbols
export default App;
