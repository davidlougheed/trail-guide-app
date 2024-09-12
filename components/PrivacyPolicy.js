// A mobile app to display interactive trail guide content.
// Copyright (C) 2021-2023  David Lougheed
// See NOTICE for more information.

import {SafeAreaView, ScrollView, StyleSheet, useWindowDimensions, View} from "react-native";

import Constants from "expo-constants";

import { pageStyles } from "./lib/sharedStyles";
import PageHeader from "./PageHeader";
import CustomRenderHTML from "./htmlDisplay/CustomRenderHTML";
import { localDataProvider } from "../dataSources";

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 16,
        backgroundColor: "white",
    },
});

const page = { long_title: "Privacy Policy" };
// noinspection JSUnresolvedReference
const privacyPolicy = {
    html: localDataProvider.settings.data?.privacy_policy ?? (
        `
        <p>
            The "${Constants.expoConfig.name}" app ("the app") does not collect any personal information from 
            users. The app may link to third-party websites which are not covered by this policy.
        </p>
        `
    ),
};

const PrivacyPolicy = () => {
    const {width} = useWindowDimensions();

    return <SafeAreaView style={pageStyles.container}>
        <ScrollView>
            <PageHeader page={page} />
            <View style={styles.content}>
                <CustomRenderHTML source={privacyPolicy} contentWidth={width} />
            </View>
        </ScrollView>
    </SafeAreaView>
};

export default PrivacyPolicy;
