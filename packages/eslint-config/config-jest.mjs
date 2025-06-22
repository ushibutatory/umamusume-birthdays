import globals from "globals";

/**
 * for Jest
 */
export default [
  {
    files: ["**/__tests__/**"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
];
