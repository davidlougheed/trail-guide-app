// A mobile app to display interactive trail guide content.
// Copyright (C) 2021-2022  David Lougheed
// See NOTICE for more information.

import {HTMLContentModel, HTMLElementModel} from "react-native-render-html";

// noinspection JSUnresolvedFunction
export default {
    "audio": HTMLElementModel.fromCustomModel({
        tagName: "audio",
        contentModel: HTMLContentModel.mixed,
    }),
    "tgcs-audio": HTMLElementModel.fromCustomModel({
        tagName: "tgcs-audio",
        contentModel: HTMLContentModel.mixed,
    }),
    "video": HTMLElementModel.fromCustomModel({
        tagName: "video",
        contentModel: HTMLContentModel.block,
    }),
};
