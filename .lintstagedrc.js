const path = require("path");

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" ")}`;

module.exports = {
  "*": "prettier --ignore-unknown --write",
  "**/*.scss": "stylelint --fix",
  "*.{ts,tsx}": "bash -c 'npx tsc --noemit'",
  "*.{js,jsx,ts,tsx}": [buildEslintCommand],
};
