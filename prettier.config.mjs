export default {
  // 基本はデフォルトを使用する

  // 改行
  printWidth: 100,

  overrides: [
    {
      files: "*.{ts,tsx}",
      options: {
        parser: "typescript",
        printWidth: 120,
      },
    },
    {
      files: "*.{js,mjs}",
      options: {
        parser: "babel",
      },
    },
    {
      files: "*.json",
      options: {
        parser: "json",
        tabWidth: 2,
        printWidth: 80,
      },
    },
    {
      files: "*.{yaml,yml}",
      options: {
        parser: "yaml",
        tabWidth: 2,
        printWidth: 80,
      },
    },
    {
      files: "*.md",
      options: {
        parser: "markdown",
        printWidth: 80,
        proseWrap: "always",
      },
    },
  ],
};
