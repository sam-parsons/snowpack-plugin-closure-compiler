module.exports = {
  root: '/Users/samparsons/Programs/snowpack-plugin-closure-compiler/fixtures/basic',
  plugins: [
    {
      name: 'snowpack-plugin-closure-compiler',
      optimize: [Function],
      markChanged: [Function],
    },
  ],
  alias: {},
  env: {},
  exclude: [
    '**/_*.{sass,scss}',
    '**.d.ts',
    '/Users/samparsons/Programs/snowpack-plugin-closure-compiler/build/**',
    '**/node_modules/**',
  ],
  routes: [],
  dependencies: {},
  devOptions: {
    secure: false,
    hostname: 'localhost',
    port: 0,
    hmrDelay: 0,
    hmrPort: undefined,
    hmrErrorOverlay: true,
    output: 'stream',
  },
  buildOptions: {
    out: '/Users/samparsons/Programs/snowpack-plugin-closure-compiler/fixtures/basic/build',
    baseUrl: '/',
    metaUrlPath: '/_snowpack',
    clean: true,
    sourcemap: false,
    watch: false,
    htmlFragments: false,
    ssr: false,
    resolveProxyImports: true,
  },
  testOptions: { files: ['__tests__/**/*', '**/*.@(spec|test).*'] },
  packageOptions: {
    source: 'local',
    external: [],
    packageLookupFields: [],
    knownEntrypoints: [],
    rollup: { plugins: [] },
  },
  mount: {
    '/Users/samparsons/Programs/snowpack-plugin-closure-compiler/fixtures/basic/public':
      {
        url: '/',
        static: true,
        resolve: true,
      },
    '/Users/samparsons/Programs/snowpack-plugin-closure-compiler/fixtures/basic/src':
      {
        url: '/dist',
        static: false,
        resolve: true,
      },
  },
  optimize: undefined,
  experiments: {},
  mode: 'production',
  _extensionMap: {
    '.mjs': ['.js'],
    '.jsx': ['.js'],
    '.ts': ['.js'],
    '.tsx': ['.js'],
  },
};
