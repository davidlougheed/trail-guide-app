export default {
    "name": process.env.TCGS_APP_NAME || "trail-guide-app",
    "slug": process.env.TCGS_APP_SLUG ||"trail-guide-app",
    "version": process.env.TCGS_APP_VERSION || "1.0.0",
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
        "supportsTablet": true
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
};
