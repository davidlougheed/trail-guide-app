import {Platform, PlatformColor} from "react-native";

export const APP_GITHUB_URL = "https://github.com/davidlougheed/trail-guide-app";

export const linkColor = Platform.OS === "web"
    ? "rgb(0, 122, 255)"
    : PlatformColor(Platform.OS === "ios" ? "link" : "?attr/colorButtonNormal");
