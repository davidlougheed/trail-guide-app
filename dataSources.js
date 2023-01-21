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
    settings: {
        data: settings,
    },
    stations: {
        categoryNested: stationData,
        enabled: enabledStations,
        enabledByID: Object.fromEntries(enabledStations.map(s => [s.id, s])),
    },
};
