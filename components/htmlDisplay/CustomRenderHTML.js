// A mobile app to display interactive trail guide content.
// Copyright (C) 2021-2025  David Lougheed
// See NOTICE for more information.

import { memo, useCallback, useMemo } from "react";
import {Linking} from "react-native";
import {RenderHTML} from "react-native-render-html";
import {useNavigation} from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";

import {localDataProvider} from "../../dataSources";

import customElements from "./customElements";
import renderers from "./renderers";
import styles from "./styles";

import {getDataFromModalURI, getDataFromPageURI, getDataFromStationURI} from "../../utils";
import * as r from "../../routes";

const CustomRenderHTML = memo(
    ({setModalsVisible, baseStyle, onNavigateAway, inModal, source, ...props}) => {
        const {modals, pages, stations} = localDataProvider;

        const navigation = useNavigation();

        const anchorOnPress = useCallback(async (event, href) => {
            // Special override for local privacy policy link
            if (href === "about:///privacy-policy") {
                navigation.navigate({name: r.PRIVACY_POLICY});
                if (onNavigateAway) onNavigateAway();
                return;
            }

            // Hack in a fix for people forgetting to put https://
            if (href.startsWith("www.")) {
                href = `https://${href}`;
            }

            const modalId = getDataFromModalURI(href);
            const pageId = getDataFromPageURI(href);
            const stationId = getDataFromStationURI(href);
            if (setModalsVisible && modalId && modals.itemsByID.hasOwnProperty(modalId)) {
                if (inModal && onNavigateAway) {
                    // If we're navigating from a modal to another modal, close the current one first.
                    onNavigateAway();
                }
                setModalsVisible({[modalId]: true});
            } else if (pageId && pages.itemsByID.hasOwnProperty(pageId)) {
                navigation.navigate({name: pageId, key: pageId});
                if (onNavigateAway) onNavigateAway();
            } else if (stationId && stations.enabledByID.hasOwnProperty(stationId)) {
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

        // Replace "narrow non-breaking space" inserted by Word pasting
        // with a normal space to prevent funky word wrapping.
        const sourceProcessed = useMemo(() => {
            if (source.html) return {html: source.html.replaceAll("\u202f", " ")};
            return source;
        }, [source]);

        // noinspection JSValidateTypes
        return <RenderHTML
            {...props}
            source={sourceProcessed}
            baseStyle={baseStyleAll}
            tagsStyles={styles.tags}
            renderers={renderers}
            renderersProps={renderersProps}
            customHTMLElementModels={customElements}
        />;
    });

export default CustomRenderHTML;
