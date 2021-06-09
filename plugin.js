const { compiler } = require('google-closure-compiler');
const fs = require('fs');
const glob = require('glob');

module.exports = function plugin(config, snowpackOptions) {
  return {
    name: 'snowpack-plugin-closure-compiler',
    async optimize({ log }) {
      // retreive all javascript files in build directory
      const files = glob.sync(config.buildOptions.out + '/**/*.js');

      // form base path of bundle directory
      const bundleDir = config.mount[config.root + '/src'].url;
      const base = config.root + '/build' + bundleDir;

      // create instance of compiler with user options/defaults
      const instance = new compiler({
        js: files,
        languageIn: 'ECMASCRIPT_2019',
        languageOut: 'ECMASCRIPT_2015',
        // handle user specified output file
        // js_output_file: base + '/index.js',
      });

      // save instance of child process to hang node process
      const compilerProcess = instance.run((exitCode, stdOut, stdErr) => {
        // handle user specified output file
        fs.writeFile(base + '/index.js', stdOut, (err) => {
          // remove older js files
          const deletableFiles = glob.sync(
            config.buildOptions.out + '/**/!(index).js'
          );
          console.log(deletableFiles);
          deletableFiles.forEach((file) => {
            fs.unlink(file, (err) => {
              if (err) log('fs.unlink error');
            });
          });
        });
      });

      // return promise to wait for compiler completion
      return new Promise((res, rej) => {
        log('closure compiler processing complete');
        compilerProcess.on('exit', res);
      });
    },
  };
};
