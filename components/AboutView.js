import React, {useEffect, useState} from "react";
import {Button, Modal, Platform, SafeAreaView, ScrollView, useWindowDimensions, View} from "react-native";
import {useAssets} from "expo-asset";
import {readAsStringAsync} from "expo-file-system";

import CustomRenderHTML from "./htmlDisplay/CustomRenderHTML";
import PageHeader from "./PageHeader";

import AboutHTMLResources, {loadedWebHTML} from "../data/about/AboutHTMLResources";
import {pageStyles} from "./lib/sharedStyles";

const modalStyles = {
    container: {flex: 1, padding: 16},
    htmlBase: {padding: 0},
};

const AboutView = () => {
    const {width} = useWindowDimensions();

    const resources = Object.entries(AboutHTMLResources)
        .sort(([k1], [k2]) => k1.localeCompare(k2));

    // noinspection JSCheckFunctionSignatures
    const [assets, error] = useAssets(resources.map(([_k, v]) => v));
    if (error) console.error(error);

    const [resourcesHTML, setResourcesHTML] = useState(
        Object.fromEntries(resources.map(([k]) => [k, ""])));
    const [modalsVisible, setModalsVisible] = useState({});

    useEffect(() => {
        if (!assets) return;
        if (Platform.OS === "web") {
            setResourcesHTML({...resourcesHTML, ...loadedWebHTML});
        } else {
            (async () => {
                const loadedAssets = await Promise.all(assets.map(a => readAsStringAsync(a.localUri)));
                setResourcesHTML({
                    ...resourcesHTML,
                    ...Object.fromEntries(resources.map((r, i) => [r[0], loadedAssets[i]])),
                });
            })();
        }
    }, [assets]);

    const renderersProps = {
        a: {
            onPress: (event, href) => {
                const hrefSplit = href.split("#");
                const anchor = hrefSplit[hrefSplit.length - 1];

                if (anchor.startsWith("modal_")) {
                    console.log(anchor);
                    setModalsVisible({[anchor]: true});
                } else {
                    // TODO: normal link handling
                }
            },
        },
    };

    return <>
        <SafeAreaView style={pageStyles.container}>
            <ScrollView>
                <PageHeader page={{long_title: "Introduction to the Elbow Lake Interpretive App"}} />
                <View style={{backgroundColor: "white", paddingHorizontal: 16}}>
                    <CustomRenderHTML
                        source={{html: resourcesHTML["about"]}}
                        contentWidth={width}
                        renderersProps={renderersProps}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
        {resources.filter(([k]) => k.startsWith("modal_")).map(([k]) => {
            const closeModal = () => setModalsVisible({...modalsVisible, [k]: undefined});
            return <Modal key={k}
                   animationType="slide"
                   transparent={false}
                   visible={modalsVisible[k] !== undefined}
                   onRequestClose={closeModal}>
                <View style={modalStyles.container}>
                    <CustomRenderHTML
                        source={{html: resourcesHTML[k] ?? ""}}
                        baseStyle={modalStyles.htmlBase}
                        contentWidth={width}
                    />
                    <Button onPress={closeModal} title="CLOSE" />
                </View>
            </Modal>;
        })}
    </>;
}

export default AboutView;
