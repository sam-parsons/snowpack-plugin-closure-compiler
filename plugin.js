module.exports = function plugin(config, options) {
  return {
    name: 'snowpack-plugin-template',
    resolve: {
      input: ['.js'],
      output: ['.js'],
    },
    load(options) {
      return;
    },
  };
};
