[npm]: https://img.shields.io/npm/v/snowpack-plugin-closure-compiler
[npm-url]: https://www.npmjs.com/package/snowpack-plugin-closure-compiler
[size]: https://packagephobia.now.sh/badge?p=snowpack-plugin-closure-compiler
[size-url]: https://packagephobia.now.sh/result?p=snowpack-plugin-closure-compiler

[![npm][npm]][npm-url]
[![size][size]][size-url]
[![libera manifesto](https://img.shields.io/badge/libera-manifesto-lightgrey.svg)](https://liberamanifesto.com)

# snowpack-plugin-closure-compiler

Snowpack plugin that processes JavaScript assets through the [Closure Compiler](https://developers.google.com/closure/compiler), reducing file sizes and performing static code analysis.

## Requirements

This plugin requires an [LTS](https://github.com/nodejs/Release) Node version (v8.0.0+) and Snowpack v2.0.0+.

## Install

Using npm:

```console
npm install --save-dev snowpack-plugin-closure-compiler
```

## Usage

Create a `snowpack.config.js` [configuration file](https://www.snowpack.dev/reference/configuration) and import the plugin:

```js
const dsv = require('snowpack-plugin-dsv');

module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' },
  },
  plugins: ['snowpack-plugin-closure-compiler'],
};
```
<!-- 
For other types of delimiters, set the `delimiter` property of the options object to the appropriate character. Note: You will have to set the file extension of your custom files to `.dsv`.

```js
module.exports = {
  mount: { ... },
  plugins: [['snowpack-plugin-dsv', { delimiter: '~' }]],
};
``` -->

## Options

### `jsOutputFilename`

Type: `string`<br>
Default: `index.js`

Specify resource name after compilation, placed inside of `mount.src.url` directory.

<!-- ### `delimiters`

Type: `array`<br>
Default: `null`

Declares multiple file extensions and delimiters to be used during build. The extension and delimiter are indicated by a custom file extension alone - a `.%sv` file will be automatically delimited with `%`.

### `processRow`

Type: `function`<br>
Default: `null`

Specifies a function which processes and manipulates each row in the parsed array. The function can manipulate the passed `row`.

This option could be used for converting numeric `string` values into `number` values - see example below.

```js
dsv({
  processRows: (row, id) => {
    Object.keys(row).forEach((key, id) => {
      let value = row[key].trim();
      row[key] = isNaN(Number(value)) ? value : Number(value);
    });
  },
});
``` -->

## Meta

[LICENSE (MIT)](./LICENSE.md)