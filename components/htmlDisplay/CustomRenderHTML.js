import React, {useCallback, useMemo} from "react";
import {RenderHTML} from "react-native-render-html";
import * as WebBrowser from "expo-web-browser";

import modalData from "../../data/modals.json";

import customElements from "./customElements";
import renderers from "./renderers";
import styles from "./styles";
import {getDataFromModalURI} from "../../utils";

const CustomRenderHTML = React.memo(({setModalsVisible, ...props}) => {
    const anchorOnPress = useCallback(async (event, href) => {
        if (href.startsWith("www.")) {
            // Hack in a fix for people forgetting to put https://
            href = `https://${href}`;
        }

        const modalId = getDataFromModalURI(href);
        if (modalData.hasOwnProperty(modalId)) {
            setModalsVisible({[modalId]: true});
        } else {
            await WebBrowser.openBrowserAsync(href);
        }
    }, [setModalsVisible]);

    const renderersProps = useMemo(() => ({
        a: {
            onPress: anchorOnPress,
        },
    }), [anchorOnPress]);

    return <RenderHTML {...props}
                       baseStyle={{...styles.base, ...(props.baseStyle ?? {})}}
                       tagsStyles={styles.tags}
                       renderers={renderers}
                       renderersProps={renderersProps}
                       customHTMLElementModels={customElements} />
});

export default CustomRenderHTML;
