const plugin = require('../plugin');
const mockConfig = require('../mocks/snowpack.config.mock');

describe('snowpack template plugin', () => {
  test('invokes plugin and returns correctly shaped object without error', () => {
    const obj = plugin(mockConfig, {});
    expect(obj.name).toEqual('snowpack-plugin-closure-compiler');
  });

  test('optimize method returns a new Promise', () => {
    const obj = plugin(mockConfig, {});
    const result = obj.optimize({ log: console.log });
    expect(result).toBeInstanceOf(Promise);
    expect(result.constructor.name).toBe('Promise');
  });
});
