import config from "./data/config.json";
// import settings from "./data/settings.json";

const appURL = new URL(process.env.TGCS_APP_BASE_URL ?? config.APP_BASE_URL ?? "https://example.com");
const appPath = appURL.pathname.replace(/\/$/, "");

export default {
    "owner": process.env.TGCS_EXPO_OWNER || undefined,
    "name": process.env.TGCS_APP_NAME || config.APP_NAME || "Trail Guide App",
    "slug": process.env.TGCS_APP_SLUG || config.APP_SLUG || "trail-guide-app",
    "version": process.env.TGCS_APP_VERSION || "1.0.0",
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
        "bundleIdentifier": process.env.TGCS_IOS_BUNDLE_IDENTIFIER || undefined,
        "buildNumber":  process.env.TGCS_IOS_BUILD_NUMBER || process.env.TGCS_APP_VERSION || "1.0.0",
        "supportsTablet": true,
        "infoPlist": {
            "NSLocationWhenInUseUsageDescription": "This app uses your location to display on the map."
        },
        "associatedDomains": [
            `applinks:${appURL.host}`,
        ]
    },
    "android": {
        "package": process.env.TGCS_ANDROID_PACKAGE || undefined,
        "versionCode": process.env.TGCS_ANDROID_VERSION_CODE
            ? parseInt(process.env.TGCS_ANDROID_VERSION_CODE, 10)
            : 1,
        "adaptiveIcon": {
            "foregroundImage": "./assets/adaptive-icon.png",
            "backgroundColor": "#FFFFFF"
        },
        "intentFilters": [{
            "action": "VIEW",
            "autoVerify": true,
            "data": [
                {"scheme": "https", "host": appURL.host, "pathPrefix": `${appPath}/modals`},
                {"scheme": "https", "host": appURL.host, "pathPrefix": `${appPath}/stations/detail`},
                {"scheme": "https", "host": appURL.host, "pathPrefix": `${appPath}/pages`},
            ],
            "category": [
                "BROWSABLE",
                "DEFAULT"
            ],
        }],
    },
    "web": {
        "favicon": "./assets/favicon.png"
    },
};
