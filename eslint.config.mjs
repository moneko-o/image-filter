import recommended from '@moneko/core/eslint/solid';

export default [
  ...recommended,
  { ignores: ['**/**/*.mdx?', 'lib', 'docs', 'coverage', '*.js'] },
];
