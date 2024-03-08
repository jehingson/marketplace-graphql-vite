module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    ignoreRestSiblings: true,
    '@typescript-eslint/no-unsafe-assignment': "off",
    "react/react-in-jsx-scope": 0,
  },
  compilerOptions: {
    "noUnusedLocals": false,
    "noEmitOnError": false
  }
};
