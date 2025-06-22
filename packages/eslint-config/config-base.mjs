import js from "@eslint/js";
import prettier from "eslint-config-prettier";

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

  // Prettierとの競合を回避
  prettier,
];
