import React from "react";
import {RenderHTML} from "react-native-render-html";

import customElements from "./customElements";
import renderers from "./renderers";
import styles from "./styles";

const CustomRenderHTML = props => {
    return <RenderHTML {...props}
                       baseStyle={{...styles.base, ...(props.baseStyle ?? {})}}
                       tagsStyles={styles.tags}
                       renderers={renderers}
                       customHTMLElementModels={customElements} />
};

export default CustomRenderHTML;
