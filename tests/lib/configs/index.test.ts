import { configs } from '../../../lib/configs';

describe('react-query/recommended', () => {
  it('should match snapshot', () => {
    expect(configs.recommended).toMatchInlineSnapshot(`
      Object {
        "plugins": Array [
          "react-query",
        ],
        "rules": Object {
          "react-query/mutation-key": "error",
          "react-query/prefer-query-object-syntax": "error",
          "react-query/query-key": "error",
        },
      }
    `);
  });
});
