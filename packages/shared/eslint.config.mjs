import { base, typescript, jest } from "@umamusume-birthdays/eslint-config";

export default [
  {
    ignores: ["**/node_modules/**", "**/dist/**", "**/lib/**", "**/build/**", "eslint.config.mjs"],
  },

  ...base,
  ...typescript,
  ...jest,

  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.eslint.json",
      },
    },
  },
];
