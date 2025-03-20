const { getDefaultConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig();

module.exports = {
  ...defaultConfig,
  resolver: {
    ...defaultConfig.resolver,
    /* Add additional resolver options here if needed */
  },
};
