import type { ConfigType } from '@moneko/core';

const conf: Partial<ConfigType> = {
  output: {
    globalObject: 'this',
  },
  devServer: {
    https: true,
  },
  virtualModule: {
    '@app/secret': {
      'ghp': 'U2FsdGVkX19QPHa1WbQc8IkxjMSl4OyugFdJVtGJISaTe4I2/wFUzvFkotry8TRTUjMtI8P+N+6B4zV9G2TnaA=='
    }
  }
};

export default conf;
