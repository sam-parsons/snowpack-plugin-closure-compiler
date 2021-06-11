const fs = require('fs');
const { generateBundle, generateSeparate } = require('./util/generators.js');

module.exports = function plugin(config, snowpackOptions) {
  return {
    name: 'snowpack-plugin-closure-compiler',
    async optimize({ log }) {
      // retrieve all javascript files in build directory
      // form build directory absolute path
      const bundleDir = config.mount[config.root + '/src'].url;
      const jsBuildDir = config.root + '/build' + bundleDir;
      // create array of absolute paths to js files
      const files = fs
        .readdirSync(jsBuildDir)
        .filter((file) => file.endsWith('.js'))
        .map((file) => jsBuildDir + '/' + file);

      const generatorOptions = [files, config, snowpackOptions, log];

      return snowpackOptions.bundle
        ? generateBundle(...generatorOptions)
        : generateSeparate(...generatorOptions);
    },
  };
};
