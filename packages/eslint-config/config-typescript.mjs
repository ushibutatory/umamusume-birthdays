import globals from "globals";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptEslintParser from "@typescript-eslint/parser";

/**
 * for TypeScript
 */
export default [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        project: true,
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
];
