import React, {useCallback, useMemo} from "react";
import {RenderHTML} from "react-native-render-html";
import {useNavigation} from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";

import modalData from "../../data/modals.json";
import pageData from "../../data/pages.json";

import customElements from "./customElements";
import renderers from "./renderers";
import styles from "./styles";
import {getDataFromModalURI, getDataFromPageURI} from "../../utils";

const pagesById = Object.fromEntries(pageData.map(p => [p.id, p]));

const CustomRenderHTML = React.memo(({setModalsVisible, baseStyle, ...props}) => {
    const navigation = useNavigation();

    const anchorOnPress = useCallback(async (event, href) => {
        if (href.startsWith("www.")) {
            // Hack in a fix for people forgetting to put https://
            href = `https://${href}`;
        }

        const modalId = getDataFromModalURI(href);
        const pageId = getDataFromPageURI(href);
        if (modalId && modalData.hasOwnProperty(modalId)) {
            setModalsVisible({[modalId]: true});
        } else if (pageId && pagesById.hasOwnProperty(pageId)) {
            navigation.navigate({name: pageId, key: pageId});
        } else {
            await WebBrowser.openBrowserAsync(href);
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
