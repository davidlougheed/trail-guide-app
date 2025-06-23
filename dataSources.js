import categoryData from "./data/categories.json";
import layerData from "./data/layers.json";
import modalData from "./data/modals.json";
import pageData from "./data/pages.json";
import stationData from "./data/stations.json";

import config from "./data/config.json";
import settings from "./data/settings.json";

const enabledStations = stationData
    .flatMap(({data}) => data)
    .filter(s => s.enabled);

export const localDataProvider = {
    categories: categoryData,
    config: {
        data: config,
    },
    layers: {
        items: layerData,
        enabled: layerData.filter(l => l.enabled),
    },
    modals: {
        itemsByID: modalData,
    },
    pages: {
        items: pageData,
        itemsByID: Object.fromEntries(pageData.map(page => [page.id, page])),
    },
    sections: Object.fromEntries(
        stationData.map(
            (s) => [s.id, Object.fromEntries(Object.entries(s).filter((e) => e[0] !== "data"))]
        )
    ),
    settings: {
        data: settings,
    },
    stations: {
        categoryNested: stationData,
        enabled: enabledStations,
        enabledByID: Object.fromEntries(enabledStations.map(s => [s.id, s])),
    },
};
