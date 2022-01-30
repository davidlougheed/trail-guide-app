import React from "react";
import {RenderHTML} from "react-native-render-html";
import * as WebBrowser from "expo-web-browser";

import modalData from "../../data/modals.json";

import customElements from "./customElements";
import renderers from "./renderers";
import styles from "./styles";
import {getDataFromModalURI} from "../../utils";

const CustomRenderHTML = ({setModalsVisible, ...props}) => {
    const renderersProps = {
        a: {
            onPress: async (event, href) => {
                const modalId = getDataFromModalURI(href);
                if (modalData.hasOwnProperty(modalId)) {
                    setModalsVisible({[modalId]: true});
                } else {
                    await WebBrowser.openBrowserAsync(href);
                }
            },
        },
    };

    return <RenderHTML {...props}
                       baseStyle={{...styles.base, ...(props.baseStyle ?? {})}}
                       tagsStyles={styles.tags}
                       renderers={renderers}
                       renderersProps={renderersProps}
                       customHTMLElementModels={customElements} />
};

export default CustomRenderHTML;
