import {HTMLContentModel, HTMLElementModel} from "react-native-render-html";

// noinspection JSUnresolvedFunction
export default {
    "video": HTMLElementModel.fromCustomModel({
        tagName: "video",
        contentModel: HTMLContentModel.block,
    }),
};
