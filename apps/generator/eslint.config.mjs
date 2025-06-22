import { base, typescript, jest } from "@umamusume-birthdays/eslint-config";

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/coverage/**",
      "eslint.config.mjs", // ESLint設定ファイル自体を除外
      "jest.config.ts", // Jest設定ファイルを除外
    ],
  },

  // 共通の設定をインポート
  ...base,
  ...typescript,
  ...jest,

  // ESLint用の設定
  {
    files: ["**/__tests__/**"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.eslint.json",
      },
    },
  },
];
