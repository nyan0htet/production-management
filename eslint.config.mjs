import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  files: ["**/*.{js,mjs,cjs,ts}"],
  languageOptions: {
    globals: globals.browser,
    parser: tsParser,  // Set the TypeScript parser
    parserOptions: {
      ecmaVersion: "latest", // Use the latest ECMAScript version
      sourceType: "module",  // Use ES Modules
      project: "./tsconfig.json", // Ensure TypeScript project is referenced
    },
  },
  plugins: {
    "@typescript-eslint": tseslint, // Use the TypeScript ESLint plugin
  },
  rules: {
    ...pluginJs.configs.recommended.rules,  // JavaScript recommended rules
    ...tseslint.configs.recommended.rules, // TypeScript recommended rules
    "import/no-commonjs": "off"
  },
};
