// A mobile app to display interactive trail guide content.
// Copyright (C) 2021-2025  David Lougheed
// See NOTICE for more information.

import { memo, useCallback, useEffect, useState } from "react";

import * as Linking from "expo-linking";
import {Ionicons} from "@expo/vector-icons";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import AsyncStorage from "@react-native-async-storage/async-storage";

import PageView from "./components/PageView";
import MapView from "./components/MapView";
import StationsView from "./components/StationsView";

const POINTS_OF_INTEREST = "Points of Interest";
const MAP = "Map";

import {localDataProvider} from "./dataSources";
import CustomModal from "./components/CustomModal";
import * as r from "./routes";

const pagesById = localDataProvider.pages.itemsByID;

const Tab = createBottomTabNavigator();

// noinspection JSUnusedGlobalSymbols
const getScreenOptions = ({route}) => ({
    tabBarIcon: ({color, size}) => {
        let iconName;

        switch (route.name) {
            case POINTS_OF_INTEREST:
                iconName = "information-circle-outline";
                break;
            case MAP:
                iconName = "map-outline";
                break;
            default:
                // Page
                iconName = pagesById?.[route.name]?.icon ?? "help-circle-outline";
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
                initialRouteName: r.STATION_LIST,
                screens: {
                    [r.STATION_LIST]: "stations/list",
                    [r.PRIVACY_POLICY]: "privacy-policy",
                    ...Object.fromEntries(
                        localDataProvider.stations.enabled.map(
                            s => [r.stationScreenName(s.id), `stations/detail/${s.id}`])),
                },
            },
            [MAP]: {
                initialRouteName: r.MAP_OVERVIEW,
                screens: {
                    [r.MAP_OVERVIEW]: "map/overview",
                    ...Object.fromEntries(
                        localDataProvider.stations.enabled.map(
                            s => [r.mapStationScreenName(s.id), `map/detail/${s.id}`])),
                },
            },
            ...Object.fromEntries(localDataProvider.pages.items.map(page => [page.id, `pages/${page.id}`])),
        },
    },
};

const KEY_TERMS_SEEN = "@termsSeen";

const SCREEN_OPTIONS = {
    [POINTS_OF_INTEREST]: {headerShown: false},
    [MAP]: {headerShown: false},
};

const PAGE_SCREENS = localDataProvider.pages.items.map(page =>
    <Tab.Screen
        key={page.id}
        name={page.id}
        component={PageView}
        options={{title: page.title}}
        initialParams={{pageId: page.id}}
    />
);

const TermsModalWithHandler = () => {
    const navigation = useNavigation();

    const termsModal = localDataProvider.settings.data?.terms_modal ?? null;

    const [termsModalVisible, setTermsModalVisible] = useState(false);

    useEffect(() => {
        const navState = navigation.getState();

        // Kind of hacky - beware of state object changing shape in future updates.
        if (navState && navState.stale && navState.routes?.[0]?.name === POINTS_OF_INTEREST) {
            // We are on initial load; check if we're on the privacy policy
            // We need to allow direct links to the privacy policy without showing the terms first, so we early-return
            // in this special case.
            const route = navState.routes[0].state;
            if ("index" in route && "routes" in route && route.routes[route.index].name === r.PRIVACY_POLICY) {
                return;
            }
        }

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
    }, [navigation]);

    const handleCloseModal = useCallback(async () => {
        try {
            await AsyncStorage.setItem(KEY_TERMS_SEEN, "true");  // Some non-null value, doesn't really matter
        } catch (e) {
            console.error(e);
        } finally {
            setTermsModalVisible(false);
        }
    }, []);

    return (
        <CustomModal
            visible={termsModalVisible}
            data={localDataProvider.modals.itemsByID[termsModal] ?? {}}
            onRequestClose={handleCloseModal}
        />
    );
};

const App = memo(() => (
    <NavigationContainer linking={linking}>
        <TermsModalWithHandler />
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
    </NavigationContainer>
));

// noinspection JSUnusedGlobalSymbols
export default App;
