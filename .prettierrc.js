module.exports = {
  printWidth: 120,
  endOfLine: "auto",
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  quoteProps: "as-needed",
  trailingComma: "none",
  bracketSpacing: false,
  bracketSameLine: true,
  arrowParens: "always",
  importOrder: ["<THIRD_PARTY_MODULES>", "^[./](.*)"],
  importOrderSeparation: true,
  importOrderParserPlugins: ["typescript", "decorators-legacy"],
  linesBeforeHeadings: 2,
  plugins: [require("@trivago/prettier-plugin-sort-imports"), require("./dist/index.js")]
};
