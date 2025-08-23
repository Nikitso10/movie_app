const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname)

// allow .cjs imports
// config.resolver.sourceExts.push('cjs');
// // <-- this line is the key fix
// config.resolver.unstable_enablePackageExports = false;


module.exports = withNativeWind(config, { input: './app/globals.css' })