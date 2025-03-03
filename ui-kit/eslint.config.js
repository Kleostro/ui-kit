import globals from 'globals';
import pluginJs from '@eslint/js';
import tsEslint from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginStorybook from 'eslint-plugin-storybook';

const customRules = {
  '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
  '@typescript-eslint/explicit-function-return-type': 'error',
  '@typescript-eslint/explicit-member-accessibility': [
    'error',
    {
      accessibility: 'explicit',
      overrides: {
        constructors: 'off',
      },
    },
  ],
  '@typescript-eslint/explicit-module-boundary-types': 'error',
  '@typescript-eslint/method-signature-style': 'error',
  '@typescript-eslint/no-explicit-any': 'error',
  '@typescript-eslint/no-inferrable-types': 'error',
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      args: 'all',
      argsIgnorePattern: '^_',
      caughtErrors: 'all',
      caughtErrorsIgnorePattern: '^_',
      destructuredArrayIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      ignoreRestSiblings: true,
    },
  ],
  '@typescript-eslint/no-use-before-define': 'error',
  '@typescript-eslint/unbound-method': ['error', { ignoreStatic: true }],
  curly: ['error', 'all'],
  'lines-between-class-members': [
    'error',
    {
      enforce: [
        { blankLine: 'always', next: 'method', prev: '*' },
        { blankLine: 'always', next: '*', prev: 'method' },
      ],
    },
  ],
  'max-len': ['error', { code: 120, ignoreComments: true }],
  'max-lines-per-function': ['error', { max: 40, skipBlankLines: true, skipComments: true }],
  'no-magic-numbers': ['error', { ignore: [0, 1, 2], ignoreArrayIndexes: true, enforceConst: true }],
  'unused-imports/no-unused-imports': 'error',
  'unicorn/no-null': 'off',
};

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['**/eslint.config.js', '**/.angular/**', '**/dist/**', '.validate-branch-namerc.cjs'],
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  eslintPluginUnicorn.configs.recommended,
  ...tsEslint.configs.recommended,
  ...tsEslint.configs.strictTypeChecked,
  ...tsEslint.configs.stylisticTypeChecked,
  ...tsEslint.configs.stylistic,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        es6: true,
      },
      parserOptions: {
        project: true,
        projectService: {
          defaultProject: import.meta.dirname + '/tsconfig.json',
        },
        tsconfigRootDir: process.cwd(),
      },
    },
    plugins: {
      'unused-imports': unusedImports,
      storybook: eslintPluginStorybook,
    },
    rules: {
      ...customRules,
    },
  },
];
