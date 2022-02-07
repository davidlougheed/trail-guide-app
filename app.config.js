import config from "./data/config.json";
// import settings from "./data/settings.json";

export default {
    "owner": process.env.TCGS_EXPO_OWNER ?? undefined,
    "name": process.env.TCGS_APP_NAME ?? config.APP_NAME ?? "Trail Guide App",
    "slug": process.env.TCGS_APP_SLUG ?? config.APP_SLUG ?? "trail-guide-app",
    "version": process.env.TCGS_APP_VERSION ?? "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
        "image": "./assets/splash.png",
        "resizeMode": "contain",
        "backgroundColor": "#ffffff"
    },
    "updates": {
        "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
        "**/*"
    ],
    "ios": {
        "supportsTablet": true,
        "infoPlist": {
            "NSLocationWhenInUseUsageDescription": "This app uses your location to display on the map."
        }
    },
    "android": {
        "adaptiveIcon": {
            "foregroundImage": "./assets/adaptive-icon.png",
            "backgroundColor": "#FFFFFF"
        }
    },
    "web": {
        "favicon": "./assets/favicon.png"
    },
    ...(config.LINKING_SCHEME ? {"scheme": config.LINKING_SCHEME} : {}),
};
