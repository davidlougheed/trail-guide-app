import React from "react";
import RNMapView, {Callout, Geojson, Marker} from "react-native-maps";
import {useAssets} from "expo-asset";

import layerData from "../data/layers.json";
import stationData from "../data/stations.json";
import {transformCoords} from "../gis";
import {Text, View} from "react-native";
import Svg, {Circle, Defs, LinearGradient, Stop} from "react-native-svg";

const iconLookup = ["culture", "environment", "research"].flatMap(
    category => ["red", "blue", "green", "orange", "other"]
        .map(colour => `${category}-${colour}`));

const colourMap = {
    "red": ["rgb(255, 59, 48)", "rgb(255, 45, 85)"],
    "blue": ["rgb(0, 122, 255)", "rgb(88, 86, 214)"],
    "green": ["rgb(52, 199, 89)", "rgb(0, 199, 190)"],
    "orange": ["rgb(255, 204, 0)", "rgb(255, 149, 0)"],
    "other": ["#333", "#111"],
};

const MobileMapComponent = ({navigation, ...props}) => {
    console.log(navigation);
    const [assets, error] = useAssets([
        require("../assets/culture-red.png"),
        require("../assets/culture-blue.png"),
        require("../assets/culture-green.png"),
        require("../assets/culture-orange.png"),
        require("../assets/culture-other.png"),
        require("../assets/environment-red.png"),
        require("../assets/environment-blue.png"),
        require("../assets/environment-green.png"),
        require("../assets/environment-orange.png"),
        require("../assets/environment-other.png"),
        require("../assets/research-red.png"),
        require("../assets/research-blue.png"),
        require("../assets/research-green.png"),
        require("../assets/research-orange.png"),
        require("../assets/research-other.png"),
    ]);

    if (error) {
        console.error(error);
    }

    return <RNMapView {...props} showsUserLocation={true} region={{
        latitude: 44.4727488,
        longitude: -76.4265608,
        latitudeDelta: 0.0922/3,
        longitudeDelta: 0.0421/3,
    }}>
        {stationData.flatMap(({id, data}, i) =>
            data.map(({title, category, coordinates_utm}, j) =>
                <Marker
                    key={`${i}.${j}`}
                    coordinate={transformCoords(coordinates_utm)}
                    // image={{uri: (assets ?? {})[iconLookup.indexOf(`${category}-${id}`)]?.localUri}}
                    // anchor={{x: 0, y: 0}}
                    calloutAnchor={{x: 0, y: -0.5}}
                    stopPropagation={true}
                >
                    <View style={{
                        height: 36,
                        width: 36,
                        // backgroundColor: colourMap[id][0],
                        // borderRadius: 18,
                    }}>
                        <Svg height="100%" width="100%" viewBox="0 0 100 100">
                            <Defs>
                                <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                                    <Stop offset="0" stopColor={colourMap[id][0]} stopOpacity="1" />
                                    <Stop offset="1" stopColor={colourMap[id][1] ?? colourMap[id][0]}
                                          stopOpacity="1" />
                                </LinearGradient>
                            </Defs>
                            <Circle cx="50" cy="50" r="50" fill="url(#grad)" />
                        </Svg>
                    </View>
                    <Callout style={{width: 16 + title.length*6.5}} onPress={() => {
                        navigation.push(`screen.map.station.${title}`);
                    }}>
                        <Text style={{textAlign: "center"}}>{title}</Text>
                    </Callout>
                </Marker>
            )
        )}
        {layerData.filter(({enabled}) => enabled).map(({id, geojson}) =>
            <Geojson
                key={id}
                geojson={geojson}
                strokeWidth={3}
            />
        )}
    </RNMapView>;
};

export default MobileMapComponent;
