// A mobile app to display interactive trail guide content.
// Copyright (C) 2021-2022  David Lougheed
// See NOTICE for more information.

import React, {useCallback, useMemo} from "react";
import {Linking} from "react-native";
import {RenderHTML} from "react-native-render-html";
import {useNavigation} from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";

import modalData from "../../data/modals.json";
import pageData from "../../data/pages.json";
import stationData from "../../data/stations.json";

import customElements from "./customElements";
import renderers from "./renderers";
import styles from "./styles";

import {getDataFromModalURI, getDataFromPageURI, getDataFromStationURI} from "../../utils";
import * as r from "../../routes";

const pagesById = Object.fromEntries(pageData.map(p => [p.id, p]));
const stationsById = Object.fromEntries(stationData.flatMap(s => s.data.map(st => [st.id, st])));

const CustomRenderHTML = React.memo(
    ({setModalsVisible, baseStyle, onNavigateAway, inModal, ...props}) => {
        const navigation = useNavigation();

        const anchorOnPress = useCallback(async (event, href) => {
            if (href === "about:///privacy-policy") {
                navigation.navigate({name: r.PRIVACY_POLICY});
                if (onNavigateAway) onNavigateAway();
                return;
            }

            if (href.startsWith("www.")) {
                // Hack in a fix for people forgetting to put https://
                href = `https://${href}`;
            }

            const modalId = getDataFromModalURI(href);
            const pageId = getDataFromPageURI(href);
            const stationId = getDataFromStationURI(href);
            if (setModalsVisible && modalId && modalData.hasOwnProperty(modalId)) {
                if (inModal && onNavigateAway) {
                    // If we're navigating from a modal to another modal, close the current one first.
                    onNavigateAway();
                }
                setModalsVisible({[modalId]: true});
            } else if (pageId && pagesById.hasOwnProperty(pageId)) {
                navigation.navigate({name: pageId, key: pageId});
                if (onNavigateAway) onNavigateAway();
            } else if (stationId && stationsById.hasOwnProperty(stationId)) {
                navigation.navigate({name: r.stationScreenName(stationId), key: stationId});
                if (onNavigateAway) onNavigateAway();
            } else if (href.startsWith("http")) {
                await WebBrowser.openBrowserAsync(href);
            } else {
                await Linking.openURL(href);
            }
        }, [setModalsVisible]);

        const baseStyleAll = useMemo(() => ({...styles.base, ...(baseStyle ?? {})}), [baseStyle]);
        const renderersProps = useMemo(() => ({
            a: {
                onPress: anchorOnPress,
            },
        }), [anchorOnPress]);

        return <RenderHTML {...props}
                           baseStyle={baseStyleAll}
                           tagsStyles={styles.tags}
                           renderers={renderers}
                           renderersProps={renderersProps}
                           customHTMLElementModels={customElements} />
    });

export default CustomRenderHTML;
