export default {
  // 基本設定
  preset: "ts-jest",
  testEnvironment: "node",

  // TypeScript設定
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },

  // ファイルパス設定
  testMatch: ["**/__tests__/**/*.{ts,js}"],

  // 無視するファイル
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/build/"],

  // カバレッジ設定
  collectCoverage: false, // デフォルトは無効、必要時に有効化
  coverageDirectory: "coverage",

  // その他
  verbose: true,
  clearMocks: true,
  restoreMocks: true,
};
