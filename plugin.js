const glob = require('glob');
const generateBundle = require('./util/generateBundle.js');
const generateSeparateFiles = require('./util/generateSeparateFiles.js');

module.exports = function plugin(config, snowpackOptions) {
  return {
    name: 'snowpack-plugin-closure-compiler',
    async optimize({ log }) {
      // retreive all javascript files in build directory
      const files = glob.sync(config.buildOptions.out + '/**/*.js');

      const generatorOptions = [files, config, snowpackOptions, log];

      return snowpackOptions.bundle
        ? generateBundle(...generatorOptions)
        : generateSeparateFiles(...generatorOptions);
    },
  };
};
