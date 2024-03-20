const path = require("path");

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

module.exports = {
  "*": "prettier --ignore-unknown --write",
  "**/*.scss": "stylelint --fix",
  "*.{ts,tsx}": "bash -c 'npx tsc --noemit'",
  "*.{js,jsx,ts,tsx}": [buildEslintCommand],
};
