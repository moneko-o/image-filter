import type { ConfigType } from '@moneko/core';

const conf: Partial<ConfigType> = {
  output: {
    globalObject: 'this',
  },
  devServer: {
    https: true,
  },
  virtualModule: {
    secret: {
      msg: 'U2FsdGVkX19EmWkFQA9msLTIfJJaINphcpE5lXAMBVexV3s5CuRyJ49dHw8uuZPAe5FXePDFvLIAXCmxN4wecIqWoZIJAKNRXmMZh7i49oP909txfQMZ2H3yqtn2hX2gsQ5L7OcAa8DcDRiJwHbOMg==',
      secretKey: '12345678901234567890123456789012'
    }
  }
};

export default conf;
