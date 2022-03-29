import {HTMLContentModel, HTMLElementModel} from "react-native-render-html";

// noinspection JSUnresolvedFunction
export default {
    "audio": HTMLElementModel.fromCustomModel({
        tagName: "audio",
        contentModel: HTMLContentModel.block,
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
