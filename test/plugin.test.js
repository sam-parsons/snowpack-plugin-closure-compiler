const plugin = require('../plugin');

describe('snowpack template plugin', () => {
  test('invokes plugin and returns correctly shaped object without error', () => {
    const obj = plugin();
    expect(obj.name).toEqual('snowpack-plugin-closure-compiler');
  });
});
