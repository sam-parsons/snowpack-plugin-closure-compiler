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
  plugins: ['snowpack-plugin-closure-compiler', {
    compilationLevel: "SIMPLE",
    outputFile: "main.js",
    bundle: false
  }],
};
```

## Options

### `bundle`

Type: `boolean`<br>
Default: `true`

The Closure Compiler can bundle all JavaScript files into and this is the default processing for the plugin.  If JavaScript files need to not be bundled, use `false`.

### `outputFile`

Type: `string`<br>
Default: `index.js`

Specify resource name after compilation, placed inside of `mount.src.url` directory.

### `compilationLevel`

Type: `string`<br>
Default: `SIMPLE`

Determines type of processing performed by Closure Compiler - specify one of `BUNDLE`, `WHITESPACE_ONLY`, `SIMPLE`, `ADVANCED`

### `languageIn`

Type: `string`<br>
Default: `ECMASCRIPT_NEXT`

Specifies what the most recent level of ECMAScript used in the source code.  One of the following: `ECMASCRIPT3`, `ECMASCRIPT5`, `ECMASCRIPT5_STRICT`, `ECMASCRIPT_2015`, `ECMASCRIPT_2016`, `ECMASCRIPT_2017`, `ECMASCRIPT_2018`, `ECMASCRIPT_2019`, `STABLE`, `ECMASCRIPT_NEXT`

### `languageOut`

Type: `string`<br>
Default: `ECMASCRIPT5`

Determines ECMAScript version of output file - use one of the values referenced in the `languageIn` property.

## Meta

[LICENSE (MIT)](./LICENSE.md)