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

const App = () => (
    <NavigationContainer>
        <Tab.Navigator screenOptions={getScreenOptions}>
            <Tab.Screen name={POINTS_OF_INTEREST} options={{headerShown: false}} component={StationsView} />
            <Tab.Screen name={MAP} component={MapView} />
            <Tab.Screen name={ABOUT} component={AboutView} />
        </Tab.Navigator>
    </NavigationContainer>
);

// noinspection JSUnusedGlobalSymbols
export default App;
