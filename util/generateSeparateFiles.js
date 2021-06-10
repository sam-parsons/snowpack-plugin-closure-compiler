const fs = require('fs');
const { compiler } = require('google-closure-compiler');

module.exports = function (files, config, snowpackOptions, log) {
  const compilerInstances = files.map((file, index) => {
    return new compiler({
      js: file,
      compilation_level: snowpackOptions.compilationLevel || 'SIMPLE',
      language_in: snowpackOptions.languageIn || 'ECMASCRIPT_NEXT',
      language_out: snowpackOptions.languageOut || 'ECMASCRIPT5',
    });
  });

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

      fs.writeFile(inputFile, stdOut, (err) => {
        if (err) log(err);
      });
    });

    // return promise to wait for compiler completion
    return new Promise((res, rej) => {
      compilerProcess.on('exit', (arg) => {
        log('closure compiler complete');
        res();
      });
      compilerProcess.on('error', (err) => {
        log('closure compiler err', err);
        rej();
      });
    });
  });

  return Promise.all(processPromises);
};
