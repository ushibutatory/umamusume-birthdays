import globals from "globals";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptEslintParser from "@typescript-eslint/parser";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  // Target files
  {
    files: ["**/*.ts"],
    ignores: ["**/node_modules/**", "**/dist/**", "**/coverage/**"],
  },

  // Use eslint recommended rule
  js.configs.recommended,

  // Parser for TypeScript
  {
    languageOptions: {
      parser: typescriptEslintParser,
      globals: {
        ...globals.node,
      },
    },
  },

  // Plugin for TypeScript
  {
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
