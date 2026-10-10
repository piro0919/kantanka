import { fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import magicNumbers from "@piro0919/eslint-config";
import google from "eslint-config-google";
import prettier from "eslint-config-prettier";
import ext from "eslint-plugin-ext";
import filenames from "eslint-plugin-filenames";
import sortDestructureKeys from "eslint-plugin-sort-destructure-keys";
import sortKeysFix from "eslint-plugin-sort-keys-fix";
import typescriptSortKeys from "eslint-plugin-typescript-sort-keys";
import unusedImports from "eslint-plugin-unused-imports";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

// eslint-config-next 15 は flat config の書き出しを持たないので、FlatCompat で読む
const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

// valid-jsdoc と require-jsdoc は ESLint 9 で無くなった
const {
  "require-jsdoc": _requireJsdoc,
  "valid-jsdoc": _validJsdoc,
  ...googleRules
} = google.rules;

export default defineConfig([
  globalIgnores(["**/*.d.ts", "**/*.js"]),
  js.configs.recommended,
  { rules: googleRules },
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    plugins: {
      "typescript-sort-keys": fixupPluginRules(typescriptSortKeys),
    },
    rules: typescriptSortKeys.configs.recommended.rules,
  },
  ...compat.extends("next/core-web-vitals"),
  prettier,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ["./tsconfig.json"],
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    plugins: {
      ext: fixupPluginRules(ext),
      filenames: fixupPluginRules(filenames),
      "sort-destructure-keys": sortDestructureKeys,
      "sort-keys-fix": fixupPluginRules(sortKeysFix),
      "unused-imports": unusedImports,
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-unused-vars": "off",
      "ext/lines-between-object-properties": ["error", "never"],
      "filenames/match-exported": ["error", ["camel", "kebab", "pascal"]],
      "filenames/match-regex": "error",
      "filenames/no-index": "off",
      "import/newline-after-import": [
        "error",
        {
          count: 1,
        },
      ],
      "import/order": [
        "error",
        {
          alphabetize: {
            caseInsensitive: true,
            order: "asc",
          },
          warnOnUnassignedImports: true,
        },
      ],
      "import/prefer-default-export": "error",
      "new-cap": "off",
      "newline-before-return": "error",
      "no-duplicate-imports": "error",
      "no-multiple-empty-lines": [
        "error",
        {
          max: 1,
        },
      ],
      "padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          next: [
            "block",
            "block-like",
            "break",
            "class",
            "const",
            "do",
            "export",
            "function",
            "let",
            "return",
            "switch",
            "try",
            "while",
          ],
          prev: "*",
        },
        {
          blankLine: "always",
          next: "*",
          prev: [
            "block",
            "block-like",
            "break",
            "class",
            "const",
            "do",
            "export",
            "function",
            "let",
            "return",
            "switch",
            "try",
            "while",
          ],
        },
        {
          blankLine: "never",
          next: "import",
          prev: "*",
        },
        {
          blankLine: "never",
          next: ["case", "default"],
          prev: "case",
        },
        {
          blankLine: "never",
          next: "const",
          prev: "const",
        },
        {
          blankLine: "never",
          next: "let",
          prev: "let",
        },
      ],
      quotes: ["error", "double"],
      "react-hooks/exhaustive-deps": [
        "error",
        {
          enableDangerousAutofixThisMayCauseInfiniteLoops: true,
        },
      ],
      "react/jsx-boolean-value": ["error", "always"],
      "react/jsx-newline": [
        "error",
        {
          prevent: true,
        },
      ],
      "react/jsx-sort-props": "error",
      "require-jsdoc": "off",
      semi: ["error", "always"],
      "sort-destructure-keys/sort-destructure-keys": "error",
      "sort-imports": [
        "error",
        {
          ignoreDeclarationSort: true,
        },
      ],
      "sort-keys": "off",
      "sort-keys-fix/sort-keys-fix": "error",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          vars: "all",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
  ...magicNumbers({ files: ["**/*.{ts,tsx}"] }),
]);
