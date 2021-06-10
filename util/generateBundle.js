const fs = require('fs');
const glob = require('glob');
const { compiler } = require('google-closure-compiler');

module.exports = function (files, config, snowpackOptions, log) {
  // form base path of bundle directory
  const bundleDir = config.mount[config.root + '/src'].url;
  const base = config.root + '/build' + bundleDir;

  // path for intermittent bundle file
  const tempOutputPath = base + '/temp.js';

  // create instance of compiler with user options/defaults
  const instance = new compiler({
    js: files,
    compilation_level: snowpackOptions.compilationLevel || 'SIMPLE',
    js_output_file: tempOutputPath,
    language_in: snowpackOptions.languageIn || 'ECMASCRIPT_NEXT',
    language_out: snowpackOptions.languageOut || 'ECMASCRIPT5',
  });

  // save instance of child process to hang node process
  const compilerProcess = instance.run((exitCode, stdOut, stdErr) => {
    // handle user specified output file
    const writeFilePath =
      base + '/' + (snowpackOptions.outputFile || 'index.js');
    const bundle = fs.readFileSync(tempOutputPath).toString();
    fs.writeFile(writeFilePath, bundle, (err) => {
      // remove older js files
      const deletableFiles = glob.sync(
        config.buildOptions.out + '/**/!(index).js'
      );
      deletableFiles.forEach((file) => {
        fs.unlink(file, (err) => {
          if (err) log('fs.unlink error');
        });
      });
    });
  });

  // return promise to wait for compiler completion
  return new Promise((res, rej) => {
    log('closure compiler complete');
    compilerProcess.on('exit', res);
    compilerProcess.on('error', rej);
  });
};
