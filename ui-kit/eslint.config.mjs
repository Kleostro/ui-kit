import globals from "globals";
import pluginJs from "@eslint/js";
import tsEslint from "typescript-eslint";
import unusedImports from "eslint-plugin-unused-imports";
import eslintPluginUnicorn from "eslint-plugin-unicorn";

const customRules = {
  "@typescript-eslint/consistent-type-assertions": ["error", { assertionStyle: "never" }],
  "@typescript-eslint/explicit-function-return-type": "error",
  "@typescript-eslint/explicit-member-accessibility": [
    "error",
    {
      accessibility: "explicit",
      overrides: {
        constructors: "off",
      },
    },
  ],
  "@typescript-eslint/explicit-module-boundary-types": "error",
  "@typescript-eslint/method-signature-style": "error",
  "@typescript-eslint/no-explicit-any": "error",
  "@typescript-eslint/no-inferrable-types": "error",
  "@typescript-eslint/no-unused-vars": [
    "error",
    {
      args: "all",
      argsIgnorePattern: "^_",
      caughtErrors: "all",
      caughtErrorsIgnorePattern: "^_",
      destructuredArrayIgnorePattern: "^_",
      varsIgnorePattern: "^_",
      ignoreRestSiblings: true,
    },
  ],
  "@typescript-eslint/no-use-before-define": "error",
  "@typescript-eslint/unbound-method": ["error", { ignoreStatic: true }],
  curly: ["error", "all"],
  // "import/extensions": [
  //   "error",
  //   "ignorePackages",
  //   {
  //     js: "never",
  //     jsx: "never",
  //     ts: "never",
  //     tsx: "never",
  //   },
  // ],
  "lines-between-class-members": [
    "error",
    {
      enforce: [
        { blankLine: "always", next: "method", prev: "*" },
        { blankLine: "always", next: "*", prev: "method" },
      ],
    },
  ],
  "max-len": ["error", { code: 120, ignoreComments: true }],
  "max-lines-per-function": ["error", { max: 40, skipBlankLines: true, skipComments: true }],
  // "no-relative-import-paths/no-relative-import-paths": [
  //   "error",
  //   { allowSameFolder: false, rootDir: "src", prefix: "@" },
  // ],
  "unused-imports/no-unused-imports": "error",
};

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["eslint.config.mjs", "**/.angular/**", "**/dist/**"],
  },
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  eslintPluginUnicorn.configs.recommended,
  ...tsEslint.configs.recommended,
  ...tsEslint.configs.strictTypeChecked,
  ...tsEslint.configs.stylisticTypeChecked,
  ...tsEslint.configs.stylistic,
  {
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        es6: true,
      },
      parserOptions: {
        project: true,
        projectService: {
          defaultProject: "./tsconfig.json",
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      ...customRules,
    },
  },
];
