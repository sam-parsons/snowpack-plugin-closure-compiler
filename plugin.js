const { compiler } = require('google-closure-compiler');
const fs = require('fs');
const glob = require('glob');
const generateBundle = require('./util/generateBundle.js');
const generateSeparateFiles = require('./util/generateSeparateFiles.js');

module.exports = function plugin(config, snowpackOptions) {
  return {
    name: 'snowpack-plugin-closure-compiler',
    async optimize({ log }) {
      // retreive all javascript files in build directory
      const files = glob.sync(config.buildOptions.out + '/**/*.js');

      if (!snowpackOptions.bundle) {
        return generateSeparateFiles(
          files,
          config,
          snowpackOptions,
          compiler,
          log
        );
      }

      return generateBundle(files, config, snowpackOptions, compiler, log);
    },
  };
};
