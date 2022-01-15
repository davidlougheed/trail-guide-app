import React from "react";
import RNMapView, {Geojson, Marker} from "react-native-maps";
import {useAssets} from "expo-asset";

import layerData from "../data/layers.json";
import stationData from "../data/stations.json";
import {transformCoords} from "../gis";

const iconLookup = ["culture", "environment", "research"].flatMap(
    category => ["red", "blue", "green", "orange", "other"]
        .map(colour => `${category}-${colour}`));

const MobileMapComponent = props => {
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

    return <RNMapView {...props} region={{
        latitude: 44.4727488,
        longitude: -76.4295608,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }}>
        {stationData.flatMap(({id, data}, i) =>
            data.map(({category, coordinates_utm}, j) => <Marker
                key={`${i}.${j}`}
                coordinate={transformCoords(coordinates_utm)}
                image={{uri: (assets ?? {})[iconLookup.indexOf(`${category}-${id}`)]?.localUri}}
            />))}
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
