const { resolve } = require('node:path');

const project = resolve(__dirname, 'tsconfig.json');

module.exports = {
  root: true,
  extends: [
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/browser'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
    require.resolve('@vercel/style-guide/eslint/react'),
    require.resolve('@vercel/style-guide/eslint/next'),
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project,
  },
  plugins: ['drizzle'],
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  overrides: [
    {
      files: '**/*.{js,jsx,ts,tsx}',
      rules: {
        '@typescript-eslint/unbound-method': 'off',
        'import/no-cycle': 'off',
      },
    },
    {
      files: [
        '*/**/page.tsx',
        '*/**/layout.tsx',
        '*/**/error.tsx',
        '*/**/not-found.tsx',
      ],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
};
