const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  // Customize the config before returning it.
  // noinspection JSValidateTypes
  return await createExpoWebpackConfigAsync({
    ...env,
    babel: {
      dangerouslyAddModulePathsToTranspile: [
        "react-leaflet",
      ]
    }
  }, argv);
};
