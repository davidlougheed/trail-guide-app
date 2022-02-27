import {HTMLContentModel, HTMLElementModel} from "react-native-render-html";

// noinspection JSUnresolvedFunction
export default {
    "audio": HTMLElementModel.fromCustomModel({
        tagName: "audio",
        contentModel: HTMLContentModel.block,
    }),
    "video": HTMLElementModel.fromCustomModel({
        tagName: "video",
        contentModel: HTMLContentModel.block,
    }),
};
