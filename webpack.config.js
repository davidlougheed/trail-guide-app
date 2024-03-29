const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  // Customize the config before returning it.
  // noinspection JSValidateTypes
  const cfg = await createExpoWebpackConfigAsync({
    ...env,
    babel: {
      dangerouslyAddModulePathsToTranspile: [
        "react-leaflet",
      ]
    }
  }, argv);
  cfg.optimization = {
    ...cfg.optimization,
    usedExports: true,  // TODO: this is false normally, but seems to cause a crash with react-native-render-html
  };
  cfg.resolve.fallback = {
    ...cfg.resolve.fallback,
    crypto: require.resolve("expo-crypto"),
  };
  return cfg;
};
