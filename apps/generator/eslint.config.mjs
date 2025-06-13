import globals from "globals";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptEslintParser from "@typescript-eslint/parser";

export default [
  // Ignore files
  {
    ignores: ["**/node_modules/**", "**/dist/**", "**/coverage/**"],
  },

  // Use eslint recommended rule
  js.configs.recommended,

  // TypeScript configuration
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        project: "./tsconfig.eslint.json",
      },
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
    },
  },

  // Settings for jest
  {
    files: ["**/__tests__/**"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
];
