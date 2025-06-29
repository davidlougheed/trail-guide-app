// A mobile app to display interactive trail guide content.
// Copyright (C) 2021-2024  David Lougheed
// See NOTICE for more information.

import proj4 from "proj4";

export const transformCoords = ({zone, east, north}) => {
    const [longitude, latitude] = proj4(
        `+proj=utm +zone=${zone}`,
        "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs",
        [east, north]
    );

    return {longitude, latitude};
};
