import React from "react";
import {Button, Modal, ScrollView, Text, TouchableOpacity, View} from "react-native";

import * as WebBrowser from "expo-web-browser";

import {APP_GITHUB_URL, linkColor} from "../constants";

const styles = {
    linkStyles: {
        color: linkColor,
    },
    paragraph: {
        marginTop: 8,
        marginBottom: 8,
    },
};

const AppInfoModal = ({visible, onRequestClose}) => {
    return <Modal animationType="slide" transparent={false} visible={visible} onRequestClose={() => onRequestClose()}>
        <ScrollView style={{flex: 1, borderBottomWidth: 1, borderBottomColor: "#CFCFCF", padding: 16}}>
            <View style={styles.paragraph}>
                <Text>
                    This application is powered by free software. See the below notice
                    for more information. The source code for this application can be found at
                </Text>
                <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync(APP_GITHUB_URL)}>
                    <Text style={styles.linkStyles}>{APP_GITHUB_URL}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.paragraph}>
                <Text>
                    An interactive trail guide mobile app with text, media, and more.
                    Copyright (C) 2021-2022  David Lougheed
                </Text>
            </View>
            <View style={styles.paragraph}>
                <Text>
                    This program is free software: you can redistribute it and/or modify
                    it under the terms of the GNU General Public License as published by
                    the Free Software Foundation, either version 3 of the License, or
                    (at your option) any later version.
                </Text>
            </View>
            <View style={styles.paragraph}>
                <Text>
                    This program is distributed in the hope that it will be useful,
                    but WITHOUT ANY WARRANTY; without even the implied warranty of
                    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
                    GNU General Public License for more details.
                </Text>
            </View>
            <View style={styles.paragraph}>
                <Text>
                    You should have received a copy of the GNU General Public License
                    along with this program.  If not, see
                </Text>
                <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync("https://www.gnu.org/licenses/")}>
                    <Text style={{color: linkColor}}>https://www.gnu.org/licenses/</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        <Button title="Close" onPress={() => onRequestClose()} />
    </Modal>;
};

export default AppInfoModal;
