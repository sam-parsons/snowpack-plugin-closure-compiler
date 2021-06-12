const fs = require('fs');
const glob = require('glob');
const { compiler } = require('google-closure-compiler');

module.exports.generateBundle = function (files, config, snowpackOptions, log) {
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
    compilerProcess.on('exit', res);
    compilerProcess.on('error', rej);
  })
    .then(() => {
      log('closure compiler complete');
    })
    .catch((err) => {
      log('error during compilation', err);
    });
};

module.exports.generateSeparate = function (
  files,
  config,
  snowpackOptions,
  log
) {
  // creates an array of compiler instances for separate file processing
  const compilerInstances = files.map((file, index) => {
    return new compiler({
      js: file,
      compilation_level: snowpackOptions.compilationLevel || 'SIMPLE',
      language_in: snowpackOptions.languageIn || 'ECMASCRIPT_NEXT',
      language_out: snowpackOptions.languageOut || 'ECMASCRIPT5',
    });
  });

  // create an array of promises to feed as argument to Promise.all
  const processPromises = compilerInstances.map((instance, index) => {
    // save instance of child process to hang node process
    const compilerProcess = instance.run((exitCode, stdOut, stdErr) => {
      // handle user specified output file
      // grab from compiler instance
      const inputFile = instance.commandArguments
        .filter((arg) => {
          return arg.startsWith('--js');
        })[0]
        .slice(5);
      // overwrite the current file with stdOut from process
      fs.writeFile(inputFile, stdOut, (err) => {
        if (err) log(err);
      });
    });

    // return promise to wait for compiler completion
    return new Promise((res, rej) => {
      compilerProcess.on('exit', res);
      compilerProcess.on('error', rej);
    });
  });

  return Promise.all(processPromises)
    .then((exitCodes) => {
      log('closure compiler complete');
      log('exit codes', exitCodes);
    })
    .catch((err) => {
      log('error during compilation', err);
    });
};
