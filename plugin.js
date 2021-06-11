const glob = require('glob');
const { generateBundle, generateSeparate } = require('./util/generators.js');

module.exports = function plugin(config, snowpackOptions) {
  return {
    name: 'snowpack-plugin-closure-compiler',
    async optimize({ log }) {
      // retrieve all javascript files in build directory
      const files = glob.sync(config.buildOptions.out + '/**/*.js');

      const generatorOptions = [files, config, snowpackOptions, log];

      return snowpackOptions.bundle
        ? generateBundle(...generatorOptions)
        : generateSeparate(...generatorOptions);
    },
  };
};
