import js from "@eslint/js";

/**
 * 汎用設定
 */
export default [
  // Ignore files
  {
    ignores: ["**/node_modules/**", "**/dist/**", "**/coverage/**"],
  },

  // Use eslint recommended rule
  js.configs.recommended,
];
