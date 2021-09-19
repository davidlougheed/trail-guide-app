import React from "react";

import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import AboutView from "./components/AboutView";
import MapView from "./components/MapView";
import StationsView from "./components/StationsView";

const Tab = createBottomTabNavigator();

const App = () => (
    <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name="Points of Interest" options={{headerShown: false}} component={StationsView} />
            <Tab.Screen name="Map" component={MapView} />
            <Tab.Screen name="About" component={AboutView} />
        </Tab.Navigator>
    </NavigationContainer>
);

// noinspection JSUnusedGlobalSymbols
export default App;
